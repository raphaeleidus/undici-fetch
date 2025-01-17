import { Readable } from 'node:stream'
import { Pool } from 'undici'

declare function buildFetch (undiciPoolOpts: Pool.Options): typeof fetch
declare const fetch: {
  (
    resource: string | Request,
    init?: { signal?: AbortSignal } & RequestInit
  ): Promise<Response>
  close: () => Promise<Array<Promise<void>>>
}

type BodyInput = Readable | null | undefined
declare class Body {
  constructor (input?: BodyInput);

  readonly body: Readable | null
  readonly bodyUsed: boolean

  arrayBuffer (): Promise<Buffer>;
  blob (): never;
  formData (): never;
  json (): Promise<any>;
  text (): Promise<string>;
}

type HeadersInit = Iterable<[string, string]> | Record<string, string>

declare class Headers implements Iterable<[string, string]> {
  constructor (init?: HeadersInit);
  append (name: string, value: string): void;
  delete (name: string): void;
  get (name: string): string | null;
  has (name: string): boolean;
  set (name: string, value: string): void;
  entries (): IterableIterator<[string, string]>;
  forEach (
    callbackfn: (value: string, key: string, iterable: Headers) => void,
    thisArg?: any
  ): void;
  keys (): IterableIterator<string>;
  values (): IterableIterator<string>;
  [Symbol.iterator] (): Iterator<[string, string]>;
}

interface RequestInit {
  method?: string
  headers?: Headers | HeadersInit
  body?: BodyInput
}

declare class Request extends Body {
  constructor (input: Request | string, init?: RequestInit);

  readonly url: URL
  readonly method: string
  readonly headers: Headers

  clone (): Request;
}

interface ResponseInit {
  status?: number
  statusText?: string
  headers?: Headers | HeadersInit
}

declare class Response extends Body {
  constructor (body: BodyInput, init?: ResponseInit)

  readonly headers: Headers
  readonly ok: boolean
  readonly status: number
  readonly statusText: string
  readonly type: string

  clone (): Response;

  static error (): Response;
  static redirect (url: string, status: number): Response;
}

export default fetch
export { buildFetch }
export type {
  Body,
  Headers,
  Request,
  Response
}
