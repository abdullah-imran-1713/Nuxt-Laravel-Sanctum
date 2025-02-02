import { defu } from "defu";
import type { UseFetchOptions } from "#app";
import { useRequestHeaders } from '#imports'; 

const BASE_URL: string = "http://localhost:8000";

export default defineNuxtPlugin((nuxtApp) => {
  const useIFetch = async <T>(
    url: string,
    options: UseFetchOptions<T> = {}
  ) => {
    let retry = 0;
    let XSRF_TOKEN = useCookie("XSRF-TOKEN");
    const headers = useRequestHeaders(); 

    
    const allCookies = headers.cookie || "";  // Important for SSR

    const defaults: UseFetchOptions<T> = {
      baseURL: BASE_URL,
      key: url,
      headers: {
        Cookie: allCookies,
        "X-XSRF-TOKEN": XSRF_TOKEN.value || "", 
        Accept: "application/json",
      },
      credentials: "include",
      onResponse: async ({ response, options }) => {
        if (response.status === 419 && retry < 1) {
          try {
            await getXsrfToken();
            retry++;
            XSRF_TOKEN = useCookie("XSRF-TOKEN");

            options.headers = {
              Cookie: allCookies,
              "X-XSRF-TOKEN": XSRF_TOKEN.value || "", 
            };

            const retryResponse = await useFetch(url, options as UseFetchOptions<T>);
            return retryResponse; // Return the result of the retry
          } catch (error) {
            console.error("Token refresh failed:", error);
            throw error; // Re-throw the error
          }
        }
        return { response, options }; // Important: Always return from onResponse
      },
    };

    let body = options.body;
    delete options.body;

    const params = defu(options, defaults);

    if (body) {
      params.body = body;
    }

    return useFetch(url, params);
  };

  nuxtApp.provide("useIFetch", useIFetch);
});

async function refreshToken() {
  const refreshToken = useCookie("refreshToken");

  const { data, status } = await useFetch<{ access: string }>(
    "http://127.0.0.1:8000/api/token/refresh/",
    {
      method: "POST",
      body: { refresh: refreshToken.value },
    }
  );

  if (status.value === "success") {
    return data.value?.access;
  } else {
    throw new Error("Token refresh failed");
  }
}

async function getXsrfToken() {

  const { data, status } = await useFetch<{ access: string }>(
    `${BASE_URL}/sanctum/csrf-cookie`,
    {
      method: "GET"
    }
  );

  if (status.value === "success") {
    return data.value?.access;
  } else {
    throw new Error("XSRF renew token failed");
  }
}