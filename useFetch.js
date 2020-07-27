import { useState, useEffect, useRef } from 'react'



export const useFetch = (url) => {

    // esta montado cuando se llama la primera vez
    //el objetivo del isMounted es que mantenga la referencia
    // cuando el hook este vivo o cuando el componente que lo usa sigue montado
    const isMounted = useRef(true);

    // que solo lo haga cuando el componente se desmonte, cambiar el valor del isMounted a false
    // no dispara la renderizacion del componente
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    const [state, setState] = useState({ data: null, loading: true, error: null });

    // Una vez que se tiene la url se dispara un efecto,
    // solo se ejecuta cuando el url cambia
    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });
            });

    }, [url]);

    // solo regreso el objeto state
    return state;
}