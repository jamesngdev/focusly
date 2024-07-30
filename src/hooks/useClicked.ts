import { useEffect, useState } from 'react';

const useClicked = () => {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    document.body.addEventListener(
      'click',
      () => {
        setInteracted(true);
      },
      true
    );

    return () => {
      document.body.removeEventListener(
        'click',
        () => {
          setInteracted(true);
        },
        true
      );
    };
  }, []);

  return interacted;
};

export default useClicked;
