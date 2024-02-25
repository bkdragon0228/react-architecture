import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

abstract class HttpClient {
    protected instance: AxiosInstance | undefined;

    protected createInstance(): AxiosInstance {
        const requestConfig: AxiosRequestConfig = {
            baseURL: "http://localhost:8000",
            headers: {
                "Content-Type": "application/json",
            },
        };

        this.instance = axios.create(requestConfig);

        this.instance.interceptors.request.use(
            (config) => {
                const accessToken = localStorage?.getItem("accessToken");

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(this.handleResponse, this.handleError);

        return this.instance;
    }

    private handleResponse = ({ data }: AxiosResponse): AxiosResponse => data;

    private handleError = (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    };
}

export interface ApiResponse<T> {
    data?: T;
    succeeded?: boolean;
    errors: any;
}

/**
 * 완료된 요청을 ApiResponse 형태로 변경
 * @param response
 * @returns
 */
const transform = (response: any): Promise<ApiResponse<any>> => {
    return new Promise((resolve, _) => {
        const result: ApiResponse<any> = {
            data: response.data,
            succeeded: response.result.resultCode === 200,
            errors: response.data.errors,
        };
        resolve(result);
    });
};

interface IBaseRepository<T> {
    get(path: string): Promise<ApiResponse<T>>;
    getMany(path: string): Promise<ApiResponse<T[]>>;
    create<DTO>(path: string, body: DTO): Promise<ApiResponse<T>>;
    update<DTO>(path: string, body: DTO): Promise<ApiResponse<T>>;
    delete(path: string): Promise<ApiResponse<T>>;
}

export class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {
    constructor() {
        super();
    }

    public async get(path: string): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.get(`/${path}`).then(transform);
        return result as ApiResponse<T>;
    }

    public async getMany(path: string): Promise<ApiResponse<T[]>> {
        const instance = this.createInstance();
        const result = await instance.get(`/${path}`).then(transform);
        return result as ApiResponse<T[]>;
    }

    public async create<Dto>(path: string, item: Dto): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.post(`/${path}`, item).then(transform);
        return result as ApiResponse<T>;
    }

    public async update<Dto>(path: string, item?: Dto): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.put(`/${path}`, item).then(transform);
        return result as ApiResponse<T>;
    }

    public async delete(path: string, item?: any): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.delete(`/${path}`, item).then(transform);
        return result as ApiResponse<T>;
    }
}
