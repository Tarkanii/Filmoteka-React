class FetchService {
    imgUrl = 'https://image.tmdb.org/t/p/w500';
    baseUrl = 'https://api.themoviedb.org/3/';
    apiKey = '122ff25a5fbe369b9dc701b94b06cdc8';
    initialParams = { language: 'en-US' };

    getTrending(page = 1, type = 'movie', period = 'week') {
        return fetch(this.getUrl(`trending/${type}/${period}`, {...this.initialParams, page}))
            .then((res) => {
                if (res.ok) return res.json();
   
                throw Error;
            })
    }

    getSearch(search, page = 1, type = 'movie') {
        return fetch(this.getUrl(`search/${type}`, {...this.initialParams, query: search, page}))
            .then((res) => {
                if (res.ok) return res.json();
   
                throw Error();
            })
    }

    getById(id, type = 'movie') {
        return fetch(this.getUrl(`${type}/${id}`, {...this.initialParams}))
            .then((res) => {
                if (res.ok) return res.json();
   
                throw Error();
            })
    }

    getGenres(type = 'movie') {
        return fetch(this.getUrl(`genre/${type}/list`, {...this.initialParams}))
            .then((res) => {
                if (res.ok) return res.json();

                throw Error();
            })
    }

    getUrl(path, params = {...this.initialParams}) {

        const paramsLine = Object.keys(params).reduce((prev, key) => {
            return prev + `&${key}=${params[key]}`;
        }, '')

        return this.baseUrl + path + `?api_key=${this.apiKey}` + paramsLine;
    }

}

export const fetchService = new FetchService();