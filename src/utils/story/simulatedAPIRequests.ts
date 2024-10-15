export async function filterOptions(
  inputValue: string,
  options: { value: string; label: string }[],
  simulatedNetworkDelayMs = 450
): Promise<Response> {
  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  const responseBody = JSON.stringify(filteredOptions);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Response(responseBody));
    }, simulatedNetworkDelayMs);
  });
}
