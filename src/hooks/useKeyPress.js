import { useEffect } from "react";

export function useKeyPress(key, action) {
  // Efekat dodavanja escape key, code je tip tastera. i takodje je potrebna funkcija ciscenja da bi se sprecilo nagomilavanje osluskivaca. Ta funkcija je document.removeEventListener. Pomocu useEffect mozemo uci u vanilla javascript klasicnu dom manipulaciju kao sto je document.addEventListener

  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key],
  );
}
