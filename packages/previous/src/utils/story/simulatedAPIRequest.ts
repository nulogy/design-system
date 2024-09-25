const simulatedAPIRequest = async (
  inputValue: string,
  data: { value: string; label: string }[],
  milliseconds = 450
): Promise<Response> => {
  const country = data.find((country) => {
    return country.value.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  const responseBody = JSON.stringify([{ name: country.value }]);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Response(responseBody));
    }, milliseconds);
  });
};

export default simulatedAPIRequest;
