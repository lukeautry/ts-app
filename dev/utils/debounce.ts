/**
 * A function that emits a side effect and does not return anything.
 */
type Procedure = (...args: any[]) => void;

interface IOptions {
  isImmediate: boolean;
}

// tslint:disable:only-arrow-functions
export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: IOptions = {
    isImmediate: false,
  },
): F {
  let timeoutId: any;

  return function(this: any, ...args: any[]) {
    // tslint:disable-next-line:no-this-assignment
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
