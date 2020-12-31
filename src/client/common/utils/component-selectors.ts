/**
 * Produce a typed selector object given a camel cased prefix and an array of selectors
 *
 * componentSelectors('MyComponent', ['SubmitButton', 'CancelButton'])
 * ->
 * { SubmitButton: 'my-component-submit-button', CancelButton: 'my-component-cancel-button' }
 */
export const componentSelectors = <K extends string>(
  prefix: string,
  selectors: readonly K[]
) => {
  const hyphenate = (val: string) => {
    let hyphenated = "";
    val.split("").forEach((char, index) => {
      if (index !== 0 && char !== char.toLowerCase()) {
        hyphenated += "-";
      }

      hyphenated += char.toLowerCase();
    });

    return hyphenated;
  };

  const hyphenatedPrefix = hyphenate(prefix);

  return selectors.reduce(
    (obj, key) => ({
      [key]: `${hyphenatedPrefix}-${hyphenate(key)}`,
      ...obj,
    }),
    {} as Record<K, string>
  );
};
