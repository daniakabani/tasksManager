const HttpClient = async ({ method, path, body = null }) => {
  try {
    let result = await fetch(`http://localhost:8000/api/v1/${path}`, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: body && JSON.stringify({ ...body }),
    });
    let jsonResult = await result?.json();
    if (jsonResult?.error) {
      throw jsonResult;
    } else {
      return jsonResult;
    }
  } catch (e) {
    throw e;
  }
};

const FormSerializer = (form) => {
  return Object.fromEntries(
    Object.values(form)
      .filter(({ value, name }) => typeof value !== "undefined" && name)
      .map(({ name, value }) => [name, value])
  );
};

const confirmMessage = (message) => {
  return window.confirm(message);
};

export { HttpClient, FormSerializer, confirmMessage };
