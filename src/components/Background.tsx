import { useEffect, useState } from 'react';
import { UNSPLASH_API, UNSPLASH_API_KEY } from '../consts/api.ts';
import { useInterval } from 'react-use';
import { randomItem, setCssVariable } from '@/lib/utils.ts';

const CONFIG_BACKGROUND_CHANGE_INTERVAL = 60 * 1000;

const Background = () => {
  const [backgrounds, setBackgrounds] = useState<string[]>([]);

  const setRandomBackground = (backgrounds: string[]) => {
    const background = randomItem(backgrounds);
    setCssVariable('--background-image', `url(${background})`);
  };

  useInterval(
    () => {
      setRandomBackground(backgrounds);
    },
    backgrounds.length ? CONFIG_BACKGROUND_CHANGE_INTERVAL : null
  );

  useEffect(() => {
    const fetchBackground = async () => {
      const URL = `${UNSPLASH_API}/search/photos?page=1&query=green tree nature&client_id=${UNSPLASH_API_KEY}`;
      const response = await fetch(URL)
        .then((res) => res.json())
        .catch((err) => console.error(err));

      const urls = response?.results
        ?.map((result: any) => result?.urls?.full)
        .filter(Boolean);
      setBackgrounds(urls);
      setRandomBackground(urls);
    };
    fetchBackground();
  }, []);

  return null;
};

export default Background;
