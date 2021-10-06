const HttpClient = async ({ method, path, body = null }) => {
  try {
    let response = await fetch(`http://localhost:8000/api/v1/${path}`, {
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
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
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

const defaultErrorMessageInvoker = (resourceName) => {
  return `Uh-Oh, Looks like we are having trouble loading your ${resourceName} now, please try again later`;
};

export {
  HttpClient,
  FormSerializer,
  confirmMessage,
  defaultErrorMessageInvoker,
};
