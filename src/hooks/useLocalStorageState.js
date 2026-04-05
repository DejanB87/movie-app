import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  // Kad god je potrebno da inicijalni render aplikacije zavisi od neke vrste proracuna uvek se u inicijalni state upisuje funkcija i ona ce biti startovana samo pri prvom renderovanju,na svako naredno nece uticati. Ovde je jos bilo potrebno da se rezultat funkcije vrati iz stringa u vrednost metodom JSON.parse(). Trostruki operater se unosi jer ukoliko ne postoji value u storage izbacice gresku zato mu dodajemo tamo gde koristimo hook (ovde je to u app i upisali smo []) kao initialState.

  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Dodavanje filma u local storage. UseEffect je najbolja opcija jer dodavanjem value i key u niz zavisnosti kontrolisemo i dodavanje i brisanje iz storage. Naziv storage(key) upisujemo kada koristimo ovaj hook (ovde je to u app i upisali smo "watched") i potrebno je pretvoriti vrednost u string metodom JSON.stringify() da bi se upisala u storage.

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}
