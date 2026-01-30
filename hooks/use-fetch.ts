import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useFetch = (url, recoilState) => {
  const setState = useSetRecoilState(recoilState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        const res = await fetch(url);
        const data = await res.json();

        setState({
          data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [url, setState]);
};

export default useFetch;
