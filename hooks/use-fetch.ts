import { useEffect } from "react";
import { useSetRecoilState, RecoilState } from "recoil";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = any>(url: string | null, recoilState: RecoilState<FetchState<T>>) => {
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
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchData();
  }, [url, setState]);
};

export default useFetch;
