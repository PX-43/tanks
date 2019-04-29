

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. 
// Make sure that the function returned is not an arrow function, as you will lose context.
export const debounce = (fn, time=200) => {
    let timeout;
    return function() {
      const functionCall = () => fn.apply(this, arguments);  
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  };

export const getGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};