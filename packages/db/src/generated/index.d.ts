
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ERP
 * 
 */
export type ERP = $Result.DefaultSelection<Prisma.$ERPPayload>
/**
 * Model ERPFieldSchema
 * 
 */
export type ERPFieldSchema = $Result.DefaultSelection<Prisma.$ERPFieldSchemaPayload>
/**
 * Model Endpoint
 * 
 */
export type Endpoint = $Result.DefaultSelection<Prisma.$EndpointPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model TestClient
 * 
 */
export type TestClient = $Result.DefaultSelection<Prisma.$TestClientPayload>
/**
 * Model PostmanCollection
 * 
 */
export type PostmanCollection = $Result.DefaultSelection<Prisma.$PostmanCollectionPayload>
/**
 * Model EmbeddingChunk
 * 
 */
export type EmbeddingChunk = $Result.DefaultSelection<Prisma.$EmbeddingChunkPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>
/**
 * Model Playbook
 * 
 */
export type Playbook = $Result.DefaultSelection<Prisma.$PlaybookPayload>
/**
 * Model PlaybookStep
 * 
 */
export type PlaybookStep = $Result.DefaultSelection<Prisma.$PlaybookStepPayload>
/**
 * Model PlaybookRun
 * 
 */
export type PlaybookRun = $Result.DefaultSelection<Prisma.$PlaybookRunPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model RequestHistory
 * 
 */
export type RequestHistory = $Result.DefaultSelection<Prisma.$RequestHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ERPS
 * const eRPS = await prisma.eRP.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ERPS
   * const eRPS = await prisma.eRP.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.eRP`: Exposes CRUD operations for the **ERP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ERPS
    * const eRPS = await prisma.eRP.findMany()
    * ```
    */
  get eRP(): Prisma.ERPDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eRPFieldSchema`: Exposes CRUD operations for the **ERPFieldSchema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ERPFieldSchemas
    * const eRPFieldSchemas = await prisma.eRPFieldSchema.findMany()
    * ```
    */
  get eRPFieldSchema(): Prisma.ERPFieldSchemaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.endpoint`: Exposes CRUD operations for the **Endpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Endpoints
    * const endpoints = await prisma.endpoint.findMany()
    * ```
    */
  get endpoint(): Prisma.EndpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testClient`: Exposes CRUD operations for the **TestClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestClients
    * const testClients = await prisma.testClient.findMany()
    * ```
    */
  get testClient(): Prisma.TestClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postmanCollection`: Exposes CRUD operations for the **PostmanCollection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostmanCollections
    * const postmanCollections = await prisma.postmanCollection.findMany()
    * ```
    */
  get postmanCollection(): Prisma.PostmanCollectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embeddingChunk`: Exposes CRUD operations for the **EmbeddingChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmbeddingChunks
    * const embeddingChunks = await prisma.embeddingChunk.findMany()
    * ```
    */
  get embeddingChunk(): Prisma.EmbeddingChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playbook`: Exposes CRUD operations for the **Playbook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playbooks
    * const playbooks = await prisma.playbook.findMany()
    * ```
    */
  get playbook(): Prisma.PlaybookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playbookStep`: Exposes CRUD operations for the **PlaybookStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaybookSteps
    * const playbookSteps = await prisma.playbookStep.findMany()
    * ```
    */
  get playbookStep(): Prisma.PlaybookStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playbookRun`: Exposes CRUD operations for the **PlaybookRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaybookRuns
    * const playbookRuns = await prisma.playbookRun.findMany()
    * ```
    */
  get playbookRun(): Prisma.PlaybookRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestHistory`: Exposes CRUD operations for the **RequestHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestHistories
    * const requestHistories = await prisma.requestHistory.findMany()
    * ```
    */
  get requestHistory(): Prisma.RequestHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ERP: 'ERP',
    ERPFieldSchema: 'ERPFieldSchema',
    Endpoint: 'Endpoint',
    Company: 'Company',
    TestClient: 'TestClient',
    PostmanCollection: 'PostmanCollection',
    EmbeddingChunk: 'EmbeddingChunk',
    Setting: 'Setting',
    Playbook: 'Playbook',
    PlaybookStep: 'PlaybookStep',
    PlaybookRun: 'PlaybookRun',
    AuditLog: 'AuditLog',
    RequestHistory: 'RequestHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "eRP" | "eRPFieldSchema" | "endpoint" | "company" | "testClient" | "postmanCollection" | "embeddingChunk" | "setting" | "playbook" | "playbookStep" | "playbookRun" | "auditLog" | "requestHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ERP: {
        payload: Prisma.$ERPPayload<ExtArgs>
        fields: Prisma.ERPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ERPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ERPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          findFirst: {
            args: Prisma.ERPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ERPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          findMany: {
            args: Prisma.ERPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>[]
          }
          create: {
            args: Prisma.ERPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          createMany: {
            args: Prisma.ERPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ERPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>[]
          }
          delete: {
            args: Prisma.ERPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          update: {
            args: Prisma.ERPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          deleteMany: {
            args: Prisma.ERPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ERPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ERPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>[]
          }
          upsert: {
            args: Prisma.ERPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPPayload>
          }
          aggregate: {
            args: Prisma.ERPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateERP>
          }
          groupBy: {
            args: Prisma.ERPGroupByArgs<ExtArgs>
            result: $Utils.Optional<ERPGroupByOutputType>[]
          }
          count: {
            args: Prisma.ERPCountArgs<ExtArgs>
            result: $Utils.Optional<ERPCountAggregateOutputType> | number
          }
        }
      }
      ERPFieldSchema: {
        payload: Prisma.$ERPFieldSchemaPayload<ExtArgs>
        fields: Prisma.ERPFieldSchemaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ERPFieldSchemaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ERPFieldSchemaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          findFirst: {
            args: Prisma.ERPFieldSchemaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ERPFieldSchemaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          findMany: {
            args: Prisma.ERPFieldSchemaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>[]
          }
          create: {
            args: Prisma.ERPFieldSchemaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          createMany: {
            args: Prisma.ERPFieldSchemaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ERPFieldSchemaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>[]
          }
          delete: {
            args: Prisma.ERPFieldSchemaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          update: {
            args: Prisma.ERPFieldSchemaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          deleteMany: {
            args: Prisma.ERPFieldSchemaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ERPFieldSchemaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ERPFieldSchemaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>[]
          }
          upsert: {
            args: Prisma.ERPFieldSchemaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ERPFieldSchemaPayload>
          }
          aggregate: {
            args: Prisma.ERPFieldSchemaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateERPFieldSchema>
          }
          groupBy: {
            args: Prisma.ERPFieldSchemaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ERPFieldSchemaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ERPFieldSchemaCountArgs<ExtArgs>
            result: $Utils.Optional<ERPFieldSchemaCountAggregateOutputType> | number
          }
        }
      }
      Endpoint: {
        payload: Prisma.$EndpointPayload<ExtArgs>
        fields: Prisma.EndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          findFirst: {
            args: Prisma.EndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          findMany: {
            args: Prisma.EndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          create: {
            args: Prisma.EndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          createMany: {
            args: Prisma.EndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          delete: {
            args: Prisma.EndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          update: {
            args: Prisma.EndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          deleteMany: {
            args: Prisma.EndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EndpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          upsert: {
            args: Prisma.EndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          aggregate: {
            args: Prisma.EndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEndpoint>
          }
          groupBy: {
            args: Prisma.EndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<EndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.EndpointCountArgs<ExtArgs>
            result: $Utils.Optional<EndpointCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      TestClient: {
        payload: Prisma.$TestClientPayload<ExtArgs>
        fields: Prisma.TestClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          findFirst: {
            args: Prisma.TestClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          findMany: {
            args: Prisma.TestClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>[]
          }
          create: {
            args: Prisma.TestClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          createMany: {
            args: Prisma.TestClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>[]
          }
          delete: {
            args: Prisma.TestClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          update: {
            args: Prisma.TestClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          deleteMany: {
            args: Prisma.TestClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>[]
          }
          upsert: {
            args: Prisma.TestClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestClientPayload>
          }
          aggregate: {
            args: Prisma.TestClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestClient>
          }
          groupBy: {
            args: Prisma.TestClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestClientCountArgs<ExtArgs>
            result: $Utils.Optional<TestClientCountAggregateOutputType> | number
          }
        }
      }
      PostmanCollection: {
        payload: Prisma.$PostmanCollectionPayload<ExtArgs>
        fields: Prisma.PostmanCollectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostmanCollectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostmanCollectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          findFirst: {
            args: Prisma.PostmanCollectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostmanCollectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          findMany: {
            args: Prisma.PostmanCollectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>[]
          }
          create: {
            args: Prisma.PostmanCollectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          createMany: {
            args: Prisma.PostmanCollectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostmanCollectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>[]
          }
          delete: {
            args: Prisma.PostmanCollectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          update: {
            args: Prisma.PostmanCollectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          deleteMany: {
            args: Prisma.PostmanCollectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostmanCollectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostmanCollectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>[]
          }
          upsert: {
            args: Prisma.PostmanCollectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostmanCollectionPayload>
          }
          aggregate: {
            args: Prisma.PostmanCollectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostmanCollection>
          }
          groupBy: {
            args: Prisma.PostmanCollectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostmanCollectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostmanCollectionCountArgs<ExtArgs>
            result: $Utils.Optional<PostmanCollectionCountAggregateOutputType> | number
          }
        }
      }
      EmbeddingChunk: {
        payload: Prisma.$EmbeddingChunkPayload<ExtArgs>
        fields: Prisma.EmbeddingChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbeddingChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbeddingChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>
          }
          findFirst: {
            args: Prisma.EmbeddingChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbeddingChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>
          }
          findMany: {
            args: Prisma.EmbeddingChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>[]
          }
          delete: {
            args: Prisma.EmbeddingChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>
          }
          update: {
            args: Prisma.EmbeddingChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>
          }
          deleteMany: {
            args: Prisma.EmbeddingChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbeddingChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmbeddingChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingChunkPayload>[]
          }
          aggregate: {
            args: Prisma.EmbeddingChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbeddingChunk>
          }
          groupBy: {
            args: Prisma.EmbeddingChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbeddingChunkCountArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingChunkCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
      Playbook: {
        payload: Prisma.$PlaybookPayload<ExtArgs>
        fields: Prisma.PlaybookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaybookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaybookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          findFirst: {
            args: Prisma.PlaybookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaybookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          findMany: {
            args: Prisma.PlaybookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>[]
          }
          create: {
            args: Prisma.PlaybookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          createMany: {
            args: Prisma.PlaybookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaybookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>[]
          }
          delete: {
            args: Prisma.PlaybookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          update: {
            args: Prisma.PlaybookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          deleteMany: {
            args: Prisma.PlaybookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaybookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaybookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>[]
          }
          upsert: {
            args: Prisma.PlaybookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookPayload>
          }
          aggregate: {
            args: Prisma.PlaybookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaybook>
          }
          groupBy: {
            args: Prisma.PlaybookGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaybookGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaybookCountArgs<ExtArgs>
            result: $Utils.Optional<PlaybookCountAggregateOutputType> | number
          }
        }
      }
      PlaybookStep: {
        payload: Prisma.$PlaybookStepPayload<ExtArgs>
        fields: Prisma.PlaybookStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaybookStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaybookStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          findFirst: {
            args: Prisma.PlaybookStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaybookStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          findMany: {
            args: Prisma.PlaybookStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>[]
          }
          create: {
            args: Prisma.PlaybookStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          createMany: {
            args: Prisma.PlaybookStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaybookStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>[]
          }
          delete: {
            args: Prisma.PlaybookStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          update: {
            args: Prisma.PlaybookStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          deleteMany: {
            args: Prisma.PlaybookStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaybookStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaybookStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>[]
          }
          upsert: {
            args: Prisma.PlaybookStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookStepPayload>
          }
          aggregate: {
            args: Prisma.PlaybookStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaybookStep>
          }
          groupBy: {
            args: Prisma.PlaybookStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaybookStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaybookStepCountArgs<ExtArgs>
            result: $Utils.Optional<PlaybookStepCountAggregateOutputType> | number
          }
        }
      }
      PlaybookRun: {
        payload: Prisma.$PlaybookRunPayload<ExtArgs>
        fields: Prisma.PlaybookRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaybookRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaybookRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          findFirst: {
            args: Prisma.PlaybookRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaybookRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          findMany: {
            args: Prisma.PlaybookRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>[]
          }
          create: {
            args: Prisma.PlaybookRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          createMany: {
            args: Prisma.PlaybookRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaybookRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>[]
          }
          delete: {
            args: Prisma.PlaybookRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          update: {
            args: Prisma.PlaybookRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          deleteMany: {
            args: Prisma.PlaybookRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaybookRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaybookRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>[]
          }
          upsert: {
            args: Prisma.PlaybookRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybookRunPayload>
          }
          aggregate: {
            args: Prisma.PlaybookRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaybookRun>
          }
          groupBy: {
            args: Prisma.PlaybookRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaybookRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaybookRunCountArgs<ExtArgs>
            result: $Utils.Optional<PlaybookRunCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      RequestHistory: {
        payload: Prisma.$RequestHistoryPayload<ExtArgs>
        fields: Prisma.RequestHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          findFirst: {
            args: Prisma.RequestHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          findMany: {
            args: Prisma.RequestHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          create: {
            args: Prisma.RequestHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          createMany: {
            args: Prisma.RequestHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          delete: {
            args: Prisma.RequestHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          update: {
            args: Prisma.RequestHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          deleteMany: {
            args: Prisma.RequestHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          upsert: {
            args: Prisma.RequestHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          aggregate: {
            args: Prisma.RequestHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestHistory>
          }
          groupBy: {
            args: Prisma.RequestHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<RequestHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    eRP?: ERPOmit
    eRPFieldSchema?: ERPFieldSchemaOmit
    endpoint?: EndpointOmit
    company?: CompanyOmit
    testClient?: TestClientOmit
    postmanCollection?: PostmanCollectionOmit
    embeddingChunk?: EmbeddingChunkOmit
    setting?: SettingOmit
    playbook?: PlaybookOmit
    playbookStep?: PlaybookStepOmit
    playbookRun?: PlaybookRunOmit
    auditLog?: AuditLogOmit
    requestHistory?: RequestHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ERPCountOutputType
   */

  export type ERPCountOutputType = {
    companies: number
    endpoints: number
    fieldSchemas: number
    playbooks: number
  }

  export type ERPCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | ERPCountOutputTypeCountCompaniesArgs
    endpoints?: boolean | ERPCountOutputTypeCountEndpointsArgs
    fieldSchemas?: boolean | ERPCountOutputTypeCountFieldSchemasArgs
    playbooks?: boolean | ERPCountOutputTypeCountPlaybooksArgs
  }

  // Custom InputTypes
  /**
   * ERPCountOutputType without action
   */
  export type ERPCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPCountOutputType
     */
    select?: ERPCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ERPCountOutputType without action
   */
  export type ERPCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }

  /**
   * ERPCountOutputType without action
   */
  export type ERPCountOutputTypeCountEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EndpointWhereInput
  }

  /**
   * ERPCountOutputType without action
   */
  export type ERPCountOutputTypeCountFieldSchemasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ERPFieldSchemaWhereInput
  }

  /**
   * ERPCountOutputType without action
   */
  export type ERPCountOutputTypeCountPlaybooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookWhereInput
  }


  /**
   * Count Type EndpointCountOutputType
   */

  export type EndpointCountOutputType = {
    playbookSteps: number
  }

  export type EndpointCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbookSteps?: boolean | EndpointCountOutputTypeCountPlaybookStepsArgs
  }

  // Custom InputTypes
  /**
   * EndpointCountOutputType without action
   */
  export type EndpointCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EndpointCountOutputType
     */
    select?: EndpointCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EndpointCountOutputType without action
   */
  export type EndpointCountOutputTypeCountPlaybookStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookStepWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    testClients: number
    playbookRuns: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testClients?: boolean | CompanyCountOutputTypeCountTestClientsArgs
    playbookRuns?: boolean | CompanyCountOutputTypeCountPlaybookRunsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTestClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestClientWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountPlaybookRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookRunWhereInput
  }


  /**
   * Count Type PostmanCollectionCountOutputType
   */

  export type PostmanCollectionCountOutputType = {
    chunks: number
  }

  export type PostmanCollectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | PostmanCollectionCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * PostmanCollectionCountOutputType without action
   */
  export type PostmanCollectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollectionCountOutputType
     */
    select?: PostmanCollectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostmanCollectionCountOutputType without action
   */
  export type PostmanCollectionCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbeddingChunkWhereInput
  }


  /**
   * Count Type PlaybookCountOutputType
   */

  export type PlaybookCountOutputType = {
    steps: number
    runs: number
  }

  export type PlaybookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | PlaybookCountOutputTypeCountStepsArgs
    runs?: boolean | PlaybookCountOutputTypeCountRunsArgs
  }

  // Custom InputTypes
  /**
   * PlaybookCountOutputType without action
   */
  export type PlaybookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookCountOutputType
     */
    select?: PlaybookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaybookCountOutputType without action
   */
  export type PlaybookCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookStepWhereInput
  }

  /**
   * PlaybookCountOutputType without action
   */
  export type PlaybookCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ERP
   */

  export type AggregateERP = {
    _count: ERPCountAggregateOutputType | null
    _avg: ERPAvgAggregateOutputType | null
    _sum: ERPSumAggregateOutputType | null
    _min: ERPMinAggregateOutputType | null
    _max: ERPMaxAggregateOutputType | null
  }

  export type ERPAvgAggregateOutputType = {
    id: number | null
  }

  export type ERPSumAggregateOutputType = {
    id: number | null
  }

  export type ERPMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type ERPMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type ERPCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type ERPAvgAggregateInputType = {
    id?: true
  }

  export type ERPSumAggregateInputType = {
    id?: true
  }

  export type ERPMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ERPMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ERPCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ERPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ERP to aggregate.
     */
    where?: ERPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPS to fetch.
     */
    orderBy?: ERPOrderByWithRelationInput | ERPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ERPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ERPS
    **/
    _count?: true | ERPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ERPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ERPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ERPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ERPMaxAggregateInputType
  }

  export type GetERPAggregateType<T extends ERPAggregateArgs> = {
        [P in keyof T & keyof AggregateERP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateERP[P]>
      : GetScalarType<T[P], AggregateERP[P]>
  }




  export type ERPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ERPWhereInput
    orderBy?: ERPOrderByWithAggregationInput | ERPOrderByWithAggregationInput[]
    by: ERPScalarFieldEnum[] | ERPScalarFieldEnum
    having?: ERPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ERPCountAggregateInputType | true
    _avg?: ERPAvgAggregateInputType
    _sum?: ERPSumAggregateInputType
    _min?: ERPMinAggregateInputType
    _max?: ERPMaxAggregateInputType
  }

  export type ERPGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    _count: ERPCountAggregateOutputType | null
    _avg: ERPAvgAggregateOutputType | null
    _sum: ERPSumAggregateOutputType | null
    _min: ERPMinAggregateOutputType | null
    _max: ERPMaxAggregateOutputType | null
  }

  type GetERPGroupByPayload<T extends ERPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ERPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ERPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ERPGroupByOutputType[P]>
            : GetScalarType<T[P], ERPGroupByOutputType[P]>
        }
      >
    >


  export type ERPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    companies?: boolean | ERP$companiesArgs<ExtArgs>
    endpoints?: boolean | ERP$endpointsArgs<ExtArgs>
    fieldSchemas?: boolean | ERP$fieldSchemasArgs<ExtArgs>
    playbooks?: boolean | ERP$playbooksArgs<ExtArgs>
    _count?: boolean | ERPCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eRP"]>

  export type ERPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["eRP"]>

  export type ERPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["eRP"]>

  export type ERPSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ERPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["eRP"]>
  export type ERPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | ERP$companiesArgs<ExtArgs>
    endpoints?: boolean | ERP$endpointsArgs<ExtArgs>
    fieldSchemas?: boolean | ERP$fieldSchemasArgs<ExtArgs>
    playbooks?: boolean | ERP$playbooksArgs<ExtArgs>
    _count?: boolean | ERPCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ERPIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ERPIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ERPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ERP"
    objects: {
      companies: Prisma.$CompanyPayload<ExtArgs>[]
      endpoints: Prisma.$EndpointPayload<ExtArgs>[]
      fieldSchemas: Prisma.$ERPFieldSchemaPayload<ExtArgs>[]
      playbooks: Prisma.$PlaybookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
    }, ExtArgs["result"]["eRP"]>
    composites: {}
  }

  type ERPGetPayload<S extends boolean | null | undefined | ERPDefaultArgs> = $Result.GetResult<Prisma.$ERPPayload, S>

  type ERPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ERPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ERPCountAggregateInputType | true
    }

  export interface ERPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ERP'], meta: { name: 'ERP' } }
    /**
     * Find zero or one ERP that matches the filter.
     * @param {ERPFindUniqueArgs} args - Arguments to find a ERP
     * @example
     * // Get one ERP
     * const eRP = await prisma.eRP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ERPFindUniqueArgs>(args: SelectSubset<T, ERPFindUniqueArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ERP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ERPFindUniqueOrThrowArgs} args - Arguments to find a ERP
     * @example
     * // Get one ERP
     * const eRP = await prisma.eRP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ERPFindUniqueOrThrowArgs>(args: SelectSubset<T, ERPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ERP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFindFirstArgs} args - Arguments to find a ERP
     * @example
     * // Get one ERP
     * const eRP = await prisma.eRP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ERPFindFirstArgs>(args?: SelectSubset<T, ERPFindFirstArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ERP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFindFirstOrThrowArgs} args - Arguments to find a ERP
     * @example
     * // Get one ERP
     * const eRP = await prisma.eRP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ERPFindFirstOrThrowArgs>(args?: SelectSubset<T, ERPFindFirstOrThrowArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ERPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ERPS
     * const eRPS = await prisma.eRP.findMany()
     * 
     * // Get first 10 ERPS
     * const eRPS = await prisma.eRP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eRPWithIdOnly = await prisma.eRP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ERPFindManyArgs>(args?: SelectSubset<T, ERPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ERP.
     * @param {ERPCreateArgs} args - Arguments to create a ERP.
     * @example
     * // Create one ERP
     * const ERP = await prisma.eRP.create({
     *   data: {
     *     // ... data to create a ERP
     *   }
     * })
     * 
     */
    create<T extends ERPCreateArgs>(args: SelectSubset<T, ERPCreateArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ERPS.
     * @param {ERPCreateManyArgs} args - Arguments to create many ERPS.
     * @example
     * // Create many ERPS
     * const eRP = await prisma.eRP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ERPCreateManyArgs>(args?: SelectSubset<T, ERPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ERPS and returns the data saved in the database.
     * @param {ERPCreateManyAndReturnArgs} args - Arguments to create many ERPS.
     * @example
     * // Create many ERPS
     * const eRP = await prisma.eRP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ERPS and only return the `id`
     * const eRPWithIdOnly = await prisma.eRP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ERPCreateManyAndReturnArgs>(args?: SelectSubset<T, ERPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ERP.
     * @param {ERPDeleteArgs} args - Arguments to delete one ERP.
     * @example
     * // Delete one ERP
     * const ERP = await prisma.eRP.delete({
     *   where: {
     *     // ... filter to delete one ERP
     *   }
     * })
     * 
     */
    delete<T extends ERPDeleteArgs>(args: SelectSubset<T, ERPDeleteArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ERP.
     * @param {ERPUpdateArgs} args - Arguments to update one ERP.
     * @example
     * // Update one ERP
     * const eRP = await prisma.eRP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ERPUpdateArgs>(args: SelectSubset<T, ERPUpdateArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ERPS.
     * @param {ERPDeleteManyArgs} args - Arguments to filter ERPS to delete.
     * @example
     * // Delete a few ERPS
     * const { count } = await prisma.eRP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ERPDeleteManyArgs>(args?: SelectSubset<T, ERPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ERPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ERPS
     * const eRP = await prisma.eRP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ERPUpdateManyArgs>(args: SelectSubset<T, ERPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ERPS and returns the data updated in the database.
     * @param {ERPUpdateManyAndReturnArgs} args - Arguments to update many ERPS.
     * @example
     * // Update many ERPS
     * const eRP = await prisma.eRP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ERPS and only return the `id`
     * const eRPWithIdOnly = await prisma.eRP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ERPUpdateManyAndReturnArgs>(args: SelectSubset<T, ERPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ERP.
     * @param {ERPUpsertArgs} args - Arguments to update or create a ERP.
     * @example
     * // Update or create a ERP
     * const eRP = await prisma.eRP.upsert({
     *   create: {
     *     // ... data to create a ERP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ERP we want to update
     *   }
     * })
     */
    upsert<T extends ERPUpsertArgs>(args: SelectSubset<T, ERPUpsertArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ERPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPCountArgs} args - Arguments to filter ERPS to count.
     * @example
     * // Count the number of ERPS
     * const count = await prisma.eRP.count({
     *   where: {
     *     // ... the filter for the ERPS we want to count
     *   }
     * })
    **/
    count<T extends ERPCountArgs>(
      args?: Subset<T, ERPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ERPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ERP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ERPAggregateArgs>(args: Subset<T, ERPAggregateArgs>): Prisma.PrismaPromise<GetERPAggregateType<T>>

    /**
     * Group by ERP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ERPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ERPGroupByArgs['orderBy'] }
        : { orderBy?: ERPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ERPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetERPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ERP model
   */
  readonly fields: ERPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ERP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ERPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends ERP$companiesArgs<ExtArgs> = {}>(args?: Subset<T, ERP$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    endpoints<T extends ERP$endpointsArgs<ExtArgs> = {}>(args?: Subset<T, ERP$endpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fieldSchemas<T extends ERP$fieldSchemasArgs<ExtArgs> = {}>(args?: Subset<T, ERP$fieldSchemasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playbooks<T extends ERP$playbooksArgs<ExtArgs> = {}>(args?: Subset<T, ERP$playbooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ERP model
   */
  interface ERPFieldRefs {
    readonly id: FieldRef<"ERP", 'Int'>
    readonly name: FieldRef<"ERP", 'String'>
    readonly createdAt: FieldRef<"ERP", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ERP findUnique
   */
  export type ERPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter, which ERP to fetch.
     */
    where: ERPWhereUniqueInput
  }

  /**
   * ERP findUniqueOrThrow
   */
  export type ERPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter, which ERP to fetch.
     */
    where: ERPWhereUniqueInput
  }

  /**
   * ERP findFirst
   */
  export type ERPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter, which ERP to fetch.
     */
    where?: ERPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPS to fetch.
     */
    orderBy?: ERPOrderByWithRelationInput | ERPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ERPS.
     */
    cursor?: ERPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ERPS.
     */
    distinct?: ERPScalarFieldEnum | ERPScalarFieldEnum[]
  }

  /**
   * ERP findFirstOrThrow
   */
  export type ERPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter, which ERP to fetch.
     */
    where?: ERPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPS to fetch.
     */
    orderBy?: ERPOrderByWithRelationInput | ERPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ERPS.
     */
    cursor?: ERPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ERPS.
     */
    distinct?: ERPScalarFieldEnum | ERPScalarFieldEnum[]
  }

  /**
   * ERP findMany
   */
  export type ERPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter, which ERPS to fetch.
     */
    where?: ERPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPS to fetch.
     */
    orderBy?: ERPOrderByWithRelationInput | ERPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ERPS.
     */
    cursor?: ERPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPS.
     */
    skip?: number
    distinct?: ERPScalarFieldEnum | ERPScalarFieldEnum[]
  }

  /**
   * ERP create
   */
  export type ERPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * The data needed to create a ERP.
     */
    data: XOR<ERPCreateInput, ERPUncheckedCreateInput>
  }

  /**
   * ERP createMany
   */
  export type ERPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ERPS.
     */
    data: ERPCreateManyInput | ERPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ERP createManyAndReturn
   */
  export type ERPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * The data used to create many ERPS.
     */
    data: ERPCreateManyInput | ERPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ERP update
   */
  export type ERPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * The data needed to update a ERP.
     */
    data: XOR<ERPUpdateInput, ERPUncheckedUpdateInput>
    /**
     * Choose, which ERP to update.
     */
    where: ERPWhereUniqueInput
  }

  /**
   * ERP updateMany
   */
  export type ERPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ERPS.
     */
    data: XOR<ERPUpdateManyMutationInput, ERPUncheckedUpdateManyInput>
    /**
     * Filter which ERPS to update
     */
    where?: ERPWhereInput
    /**
     * Limit how many ERPS to update.
     */
    limit?: number
  }

  /**
   * ERP updateManyAndReturn
   */
  export type ERPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * The data used to update ERPS.
     */
    data: XOR<ERPUpdateManyMutationInput, ERPUncheckedUpdateManyInput>
    /**
     * Filter which ERPS to update
     */
    where?: ERPWhereInput
    /**
     * Limit how many ERPS to update.
     */
    limit?: number
  }

  /**
   * ERP upsert
   */
  export type ERPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * The filter to search for the ERP to update in case it exists.
     */
    where: ERPWhereUniqueInput
    /**
     * In case the ERP found by the `where` argument doesn't exist, create a new ERP with this data.
     */
    create: XOR<ERPCreateInput, ERPUncheckedCreateInput>
    /**
     * In case the ERP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ERPUpdateInput, ERPUncheckedUpdateInput>
  }

  /**
   * ERP delete
   */
  export type ERPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
    /**
     * Filter which ERP to delete.
     */
    where: ERPWhereUniqueInput
  }

  /**
   * ERP deleteMany
   */
  export type ERPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ERPS to delete
     */
    where?: ERPWhereInput
    /**
     * Limit how many ERPS to delete.
     */
    limit?: number
  }

  /**
   * ERP.companies
   */
  export type ERP$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * ERP.endpoints
   */
  export type ERP$endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    where?: EndpointWhereInput
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    cursor?: EndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * ERP.fieldSchemas
   */
  export type ERP$fieldSchemasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    where?: ERPFieldSchemaWhereInput
    orderBy?: ERPFieldSchemaOrderByWithRelationInput | ERPFieldSchemaOrderByWithRelationInput[]
    cursor?: ERPFieldSchemaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ERPFieldSchemaScalarFieldEnum | ERPFieldSchemaScalarFieldEnum[]
  }

  /**
   * ERP.playbooks
   */
  export type ERP$playbooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    where?: PlaybookWhereInput
    orderBy?: PlaybookOrderByWithRelationInput | PlaybookOrderByWithRelationInput[]
    cursor?: PlaybookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybookScalarFieldEnum | PlaybookScalarFieldEnum[]
  }

  /**
   * ERP without action
   */
  export type ERPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERP
     */
    select?: ERPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERP
     */
    omit?: ERPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPInclude<ExtArgs> | null
  }


  /**
   * Model ERPFieldSchema
   */

  export type AggregateERPFieldSchema = {
    _count: ERPFieldSchemaCountAggregateOutputType | null
    _avg: ERPFieldSchemaAvgAggregateOutputType | null
    _sum: ERPFieldSchemaSumAggregateOutputType | null
    _min: ERPFieldSchemaMinAggregateOutputType | null
    _max: ERPFieldSchemaMaxAggregateOutputType | null
  }

  export type ERPFieldSchemaAvgAggregateOutputType = {
    id: number | null
    erpId: number | null
    sortOrder: number | null
    sourceEndpointId: number | null
  }

  export type ERPFieldSchemaSumAggregateOutputType = {
    id: number | null
    erpId: number | null
    sortOrder: number | null
    sourceEndpointId: number | null
  }

  export type ERPFieldSchemaMinAggregateOutputType = {
    id: number | null
    erpId: number | null
    fieldName: string | null
    label: string | null
    fieldType: string | null
    required: boolean | null
    sortOrder: number | null
    sourceEndpointId: number | null
    endpointParam: string | null
    responsePath: string | null
  }

  export type ERPFieldSchemaMaxAggregateOutputType = {
    id: number | null
    erpId: number | null
    fieldName: string | null
    label: string | null
    fieldType: string | null
    required: boolean | null
    sortOrder: number | null
    sourceEndpointId: number | null
    endpointParam: string | null
    responsePath: string | null
  }

  export type ERPFieldSchemaCountAggregateOutputType = {
    id: number
    erpId: number
    fieldName: number
    label: number
    fieldType: number
    required: number
    sortOrder: number
    sourceEndpointId: number
    endpointParam: number
    responsePath: number
    _all: number
  }


  export type ERPFieldSchemaAvgAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
    sourceEndpointId?: true
  }

  export type ERPFieldSchemaSumAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
    sourceEndpointId?: true
  }

  export type ERPFieldSchemaMinAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
    sourceEndpointId?: true
    endpointParam?: true
    responsePath?: true
  }

  export type ERPFieldSchemaMaxAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
    sourceEndpointId?: true
    endpointParam?: true
    responsePath?: true
  }

  export type ERPFieldSchemaCountAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
    sourceEndpointId?: true
    endpointParam?: true
    responsePath?: true
    _all?: true
  }

  export type ERPFieldSchemaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ERPFieldSchema to aggregate.
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPFieldSchemas to fetch.
     */
    orderBy?: ERPFieldSchemaOrderByWithRelationInput | ERPFieldSchemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ERPFieldSchemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPFieldSchemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPFieldSchemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ERPFieldSchemas
    **/
    _count?: true | ERPFieldSchemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ERPFieldSchemaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ERPFieldSchemaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ERPFieldSchemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ERPFieldSchemaMaxAggregateInputType
  }

  export type GetERPFieldSchemaAggregateType<T extends ERPFieldSchemaAggregateArgs> = {
        [P in keyof T & keyof AggregateERPFieldSchema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateERPFieldSchema[P]>
      : GetScalarType<T[P], AggregateERPFieldSchema[P]>
  }




  export type ERPFieldSchemaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ERPFieldSchemaWhereInput
    orderBy?: ERPFieldSchemaOrderByWithAggregationInput | ERPFieldSchemaOrderByWithAggregationInput[]
    by: ERPFieldSchemaScalarFieldEnum[] | ERPFieldSchemaScalarFieldEnum
    having?: ERPFieldSchemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ERPFieldSchemaCountAggregateInputType | true
    _avg?: ERPFieldSchemaAvgAggregateInputType
    _sum?: ERPFieldSchemaSumAggregateInputType
    _min?: ERPFieldSchemaMinAggregateInputType
    _max?: ERPFieldSchemaMaxAggregateInputType
  }

  export type ERPFieldSchemaGroupByOutputType = {
    id: number
    erpId: number
    fieldName: string
    label: string
    fieldType: string
    required: boolean
    sortOrder: number
    sourceEndpointId: number | null
    endpointParam: string
    responsePath: string
    _count: ERPFieldSchemaCountAggregateOutputType | null
    _avg: ERPFieldSchemaAvgAggregateOutputType | null
    _sum: ERPFieldSchemaSumAggregateOutputType | null
    _min: ERPFieldSchemaMinAggregateOutputType | null
    _max: ERPFieldSchemaMaxAggregateOutputType | null
  }

  type GetERPFieldSchemaGroupByPayload<T extends ERPFieldSchemaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ERPFieldSchemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ERPFieldSchemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ERPFieldSchemaGroupByOutputType[P]>
            : GetScalarType<T[P], ERPFieldSchemaGroupByOutputType[P]>
        }
      >
    >


  export type ERPFieldSchemaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    fieldName?: boolean
    label?: boolean
    fieldType?: boolean
    required?: boolean
    sortOrder?: boolean
    sourceEndpointId?: boolean
    endpointParam?: boolean
    responsePath?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eRPFieldSchema"]>

  export type ERPFieldSchemaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    fieldName?: boolean
    label?: boolean
    fieldType?: boolean
    required?: boolean
    sortOrder?: boolean
    sourceEndpointId?: boolean
    endpointParam?: boolean
    responsePath?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eRPFieldSchema"]>

  export type ERPFieldSchemaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    fieldName?: boolean
    label?: boolean
    fieldType?: boolean
    required?: boolean
    sortOrder?: boolean
    sourceEndpointId?: boolean
    endpointParam?: boolean
    responsePath?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eRPFieldSchema"]>

  export type ERPFieldSchemaSelectScalar = {
    id?: boolean
    erpId?: boolean
    fieldName?: boolean
    label?: boolean
    fieldType?: boolean
    required?: boolean
    sortOrder?: boolean
    sourceEndpointId?: boolean
    endpointParam?: boolean
    responsePath?: boolean
  }

  export type ERPFieldSchemaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpId" | "fieldName" | "label" | "fieldType" | "required" | "sortOrder" | "sourceEndpointId" | "endpointParam" | "responsePath", ExtArgs["result"]["eRPFieldSchema"]>
  export type ERPFieldSchemaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }
  export type ERPFieldSchemaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }
  export type ERPFieldSchemaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }

  export type $ERPFieldSchemaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ERPFieldSchema"
    objects: {
      erp: Prisma.$ERPPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      erpId: number
      fieldName: string
      label: string
      fieldType: string
      required: boolean
      sortOrder: number
      sourceEndpointId: number | null
      endpointParam: string
      responsePath: string
    }, ExtArgs["result"]["eRPFieldSchema"]>
    composites: {}
  }

  type ERPFieldSchemaGetPayload<S extends boolean | null | undefined | ERPFieldSchemaDefaultArgs> = $Result.GetResult<Prisma.$ERPFieldSchemaPayload, S>

  type ERPFieldSchemaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ERPFieldSchemaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ERPFieldSchemaCountAggregateInputType | true
    }

  export interface ERPFieldSchemaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ERPFieldSchema'], meta: { name: 'ERPFieldSchema' } }
    /**
     * Find zero or one ERPFieldSchema that matches the filter.
     * @param {ERPFieldSchemaFindUniqueArgs} args - Arguments to find a ERPFieldSchema
     * @example
     * // Get one ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ERPFieldSchemaFindUniqueArgs>(args: SelectSubset<T, ERPFieldSchemaFindUniqueArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ERPFieldSchema that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ERPFieldSchemaFindUniqueOrThrowArgs} args - Arguments to find a ERPFieldSchema
     * @example
     * // Get one ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ERPFieldSchemaFindUniqueOrThrowArgs>(args: SelectSubset<T, ERPFieldSchemaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ERPFieldSchema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaFindFirstArgs} args - Arguments to find a ERPFieldSchema
     * @example
     * // Get one ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ERPFieldSchemaFindFirstArgs>(args?: SelectSubset<T, ERPFieldSchemaFindFirstArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ERPFieldSchema that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaFindFirstOrThrowArgs} args - Arguments to find a ERPFieldSchema
     * @example
     * // Get one ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ERPFieldSchemaFindFirstOrThrowArgs>(args?: SelectSubset<T, ERPFieldSchemaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ERPFieldSchemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ERPFieldSchemas
     * const eRPFieldSchemas = await prisma.eRPFieldSchema.findMany()
     * 
     * // Get first 10 ERPFieldSchemas
     * const eRPFieldSchemas = await prisma.eRPFieldSchema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eRPFieldSchemaWithIdOnly = await prisma.eRPFieldSchema.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ERPFieldSchemaFindManyArgs>(args?: SelectSubset<T, ERPFieldSchemaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ERPFieldSchema.
     * @param {ERPFieldSchemaCreateArgs} args - Arguments to create a ERPFieldSchema.
     * @example
     * // Create one ERPFieldSchema
     * const ERPFieldSchema = await prisma.eRPFieldSchema.create({
     *   data: {
     *     // ... data to create a ERPFieldSchema
     *   }
     * })
     * 
     */
    create<T extends ERPFieldSchemaCreateArgs>(args: SelectSubset<T, ERPFieldSchemaCreateArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ERPFieldSchemas.
     * @param {ERPFieldSchemaCreateManyArgs} args - Arguments to create many ERPFieldSchemas.
     * @example
     * // Create many ERPFieldSchemas
     * const eRPFieldSchema = await prisma.eRPFieldSchema.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ERPFieldSchemaCreateManyArgs>(args?: SelectSubset<T, ERPFieldSchemaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ERPFieldSchemas and returns the data saved in the database.
     * @param {ERPFieldSchemaCreateManyAndReturnArgs} args - Arguments to create many ERPFieldSchemas.
     * @example
     * // Create many ERPFieldSchemas
     * const eRPFieldSchema = await prisma.eRPFieldSchema.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ERPFieldSchemas and only return the `id`
     * const eRPFieldSchemaWithIdOnly = await prisma.eRPFieldSchema.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ERPFieldSchemaCreateManyAndReturnArgs>(args?: SelectSubset<T, ERPFieldSchemaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ERPFieldSchema.
     * @param {ERPFieldSchemaDeleteArgs} args - Arguments to delete one ERPFieldSchema.
     * @example
     * // Delete one ERPFieldSchema
     * const ERPFieldSchema = await prisma.eRPFieldSchema.delete({
     *   where: {
     *     // ... filter to delete one ERPFieldSchema
     *   }
     * })
     * 
     */
    delete<T extends ERPFieldSchemaDeleteArgs>(args: SelectSubset<T, ERPFieldSchemaDeleteArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ERPFieldSchema.
     * @param {ERPFieldSchemaUpdateArgs} args - Arguments to update one ERPFieldSchema.
     * @example
     * // Update one ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ERPFieldSchemaUpdateArgs>(args: SelectSubset<T, ERPFieldSchemaUpdateArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ERPFieldSchemas.
     * @param {ERPFieldSchemaDeleteManyArgs} args - Arguments to filter ERPFieldSchemas to delete.
     * @example
     * // Delete a few ERPFieldSchemas
     * const { count } = await prisma.eRPFieldSchema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ERPFieldSchemaDeleteManyArgs>(args?: SelectSubset<T, ERPFieldSchemaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ERPFieldSchemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ERPFieldSchemas
     * const eRPFieldSchema = await prisma.eRPFieldSchema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ERPFieldSchemaUpdateManyArgs>(args: SelectSubset<T, ERPFieldSchemaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ERPFieldSchemas and returns the data updated in the database.
     * @param {ERPFieldSchemaUpdateManyAndReturnArgs} args - Arguments to update many ERPFieldSchemas.
     * @example
     * // Update many ERPFieldSchemas
     * const eRPFieldSchema = await prisma.eRPFieldSchema.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ERPFieldSchemas and only return the `id`
     * const eRPFieldSchemaWithIdOnly = await prisma.eRPFieldSchema.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ERPFieldSchemaUpdateManyAndReturnArgs>(args: SelectSubset<T, ERPFieldSchemaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ERPFieldSchema.
     * @param {ERPFieldSchemaUpsertArgs} args - Arguments to update or create a ERPFieldSchema.
     * @example
     * // Update or create a ERPFieldSchema
     * const eRPFieldSchema = await prisma.eRPFieldSchema.upsert({
     *   create: {
     *     // ... data to create a ERPFieldSchema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ERPFieldSchema we want to update
     *   }
     * })
     */
    upsert<T extends ERPFieldSchemaUpsertArgs>(args: SelectSubset<T, ERPFieldSchemaUpsertArgs<ExtArgs>>): Prisma__ERPFieldSchemaClient<$Result.GetResult<Prisma.$ERPFieldSchemaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ERPFieldSchemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaCountArgs} args - Arguments to filter ERPFieldSchemas to count.
     * @example
     * // Count the number of ERPFieldSchemas
     * const count = await prisma.eRPFieldSchema.count({
     *   where: {
     *     // ... the filter for the ERPFieldSchemas we want to count
     *   }
     * })
    **/
    count<T extends ERPFieldSchemaCountArgs>(
      args?: Subset<T, ERPFieldSchemaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ERPFieldSchemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ERPFieldSchema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ERPFieldSchemaAggregateArgs>(args: Subset<T, ERPFieldSchemaAggregateArgs>): Prisma.PrismaPromise<GetERPFieldSchemaAggregateType<T>>

    /**
     * Group by ERPFieldSchema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ERPFieldSchemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ERPFieldSchemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ERPFieldSchemaGroupByArgs['orderBy'] }
        : { orderBy?: ERPFieldSchemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ERPFieldSchemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetERPFieldSchemaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ERPFieldSchema model
   */
  readonly fields: ERPFieldSchemaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ERPFieldSchema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ERPFieldSchemaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    erp<T extends ERPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ERPDefaultArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ERPFieldSchema model
   */
  interface ERPFieldSchemaFieldRefs {
    readonly id: FieldRef<"ERPFieldSchema", 'Int'>
    readonly erpId: FieldRef<"ERPFieldSchema", 'Int'>
    readonly fieldName: FieldRef<"ERPFieldSchema", 'String'>
    readonly label: FieldRef<"ERPFieldSchema", 'String'>
    readonly fieldType: FieldRef<"ERPFieldSchema", 'String'>
    readonly required: FieldRef<"ERPFieldSchema", 'Boolean'>
    readonly sortOrder: FieldRef<"ERPFieldSchema", 'Int'>
    readonly sourceEndpointId: FieldRef<"ERPFieldSchema", 'Int'>
    readonly endpointParam: FieldRef<"ERPFieldSchema", 'String'>
    readonly responsePath: FieldRef<"ERPFieldSchema", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ERPFieldSchema findUnique
   */
  export type ERPFieldSchemaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter, which ERPFieldSchema to fetch.
     */
    where: ERPFieldSchemaWhereUniqueInput
  }

  /**
   * ERPFieldSchema findUniqueOrThrow
   */
  export type ERPFieldSchemaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter, which ERPFieldSchema to fetch.
     */
    where: ERPFieldSchemaWhereUniqueInput
  }

  /**
   * ERPFieldSchema findFirst
   */
  export type ERPFieldSchemaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter, which ERPFieldSchema to fetch.
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPFieldSchemas to fetch.
     */
    orderBy?: ERPFieldSchemaOrderByWithRelationInput | ERPFieldSchemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ERPFieldSchemas.
     */
    cursor?: ERPFieldSchemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPFieldSchemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPFieldSchemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ERPFieldSchemas.
     */
    distinct?: ERPFieldSchemaScalarFieldEnum | ERPFieldSchemaScalarFieldEnum[]
  }

  /**
   * ERPFieldSchema findFirstOrThrow
   */
  export type ERPFieldSchemaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter, which ERPFieldSchema to fetch.
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPFieldSchemas to fetch.
     */
    orderBy?: ERPFieldSchemaOrderByWithRelationInput | ERPFieldSchemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ERPFieldSchemas.
     */
    cursor?: ERPFieldSchemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPFieldSchemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPFieldSchemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ERPFieldSchemas.
     */
    distinct?: ERPFieldSchemaScalarFieldEnum | ERPFieldSchemaScalarFieldEnum[]
  }

  /**
   * ERPFieldSchema findMany
   */
  export type ERPFieldSchemaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter, which ERPFieldSchemas to fetch.
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ERPFieldSchemas to fetch.
     */
    orderBy?: ERPFieldSchemaOrderByWithRelationInput | ERPFieldSchemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ERPFieldSchemas.
     */
    cursor?: ERPFieldSchemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ERPFieldSchemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ERPFieldSchemas.
     */
    skip?: number
    distinct?: ERPFieldSchemaScalarFieldEnum | ERPFieldSchemaScalarFieldEnum[]
  }

  /**
   * ERPFieldSchema create
   */
  export type ERPFieldSchemaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * The data needed to create a ERPFieldSchema.
     */
    data: XOR<ERPFieldSchemaCreateInput, ERPFieldSchemaUncheckedCreateInput>
  }

  /**
   * ERPFieldSchema createMany
   */
  export type ERPFieldSchemaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ERPFieldSchemas.
     */
    data: ERPFieldSchemaCreateManyInput | ERPFieldSchemaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ERPFieldSchema createManyAndReturn
   */
  export type ERPFieldSchemaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * The data used to create many ERPFieldSchemas.
     */
    data: ERPFieldSchemaCreateManyInput | ERPFieldSchemaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ERPFieldSchema update
   */
  export type ERPFieldSchemaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * The data needed to update a ERPFieldSchema.
     */
    data: XOR<ERPFieldSchemaUpdateInput, ERPFieldSchemaUncheckedUpdateInput>
    /**
     * Choose, which ERPFieldSchema to update.
     */
    where: ERPFieldSchemaWhereUniqueInput
  }

  /**
   * ERPFieldSchema updateMany
   */
  export type ERPFieldSchemaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ERPFieldSchemas.
     */
    data: XOR<ERPFieldSchemaUpdateManyMutationInput, ERPFieldSchemaUncheckedUpdateManyInput>
    /**
     * Filter which ERPFieldSchemas to update
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * Limit how many ERPFieldSchemas to update.
     */
    limit?: number
  }

  /**
   * ERPFieldSchema updateManyAndReturn
   */
  export type ERPFieldSchemaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * The data used to update ERPFieldSchemas.
     */
    data: XOR<ERPFieldSchemaUpdateManyMutationInput, ERPFieldSchemaUncheckedUpdateManyInput>
    /**
     * Filter which ERPFieldSchemas to update
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * Limit how many ERPFieldSchemas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ERPFieldSchema upsert
   */
  export type ERPFieldSchemaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * The filter to search for the ERPFieldSchema to update in case it exists.
     */
    where: ERPFieldSchemaWhereUniqueInput
    /**
     * In case the ERPFieldSchema found by the `where` argument doesn't exist, create a new ERPFieldSchema with this data.
     */
    create: XOR<ERPFieldSchemaCreateInput, ERPFieldSchemaUncheckedCreateInput>
    /**
     * In case the ERPFieldSchema was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ERPFieldSchemaUpdateInput, ERPFieldSchemaUncheckedUpdateInput>
  }

  /**
   * ERPFieldSchema delete
   */
  export type ERPFieldSchemaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
    /**
     * Filter which ERPFieldSchema to delete.
     */
    where: ERPFieldSchemaWhereUniqueInput
  }

  /**
   * ERPFieldSchema deleteMany
   */
  export type ERPFieldSchemaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ERPFieldSchemas to delete
     */
    where?: ERPFieldSchemaWhereInput
    /**
     * Limit how many ERPFieldSchemas to delete.
     */
    limit?: number
  }

  /**
   * ERPFieldSchema without action
   */
  export type ERPFieldSchemaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ERPFieldSchema
     */
    select?: ERPFieldSchemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ERPFieldSchema
     */
    omit?: ERPFieldSchemaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ERPFieldSchemaInclude<ExtArgs> | null
  }


  /**
   * Model Endpoint
   */

  export type AggregateEndpoint = {
    _count: EndpointCountAggregateOutputType | null
    _avg: EndpointAvgAggregateOutputType | null
    _sum: EndpointSumAggregateOutputType | null
    _min: EndpointMinAggregateOutputType | null
    _max: EndpointMaxAggregateOutputType | null
  }

  export type EndpointAvgAggregateOutputType = {
    id: number | null
    erpId: number | null
    sortOrder: number | null
  }

  export type EndpointSumAggregateOutputType = {
    id: number | null
    erpId: number | null
    sortOrder: number | null
  }

  export type EndpointMinAggregateOutputType = {
    id: number | null
    erpId: number | null
    name: string | null
    method: string | null
    pathTemplate: string | null
    bodyTemplate: string | null
    headers: string | null
    sortOrder: number | null
    group: string | null
    requiresClient: boolean | null
    isModification: boolean | null
    notes: string | null
  }

  export type EndpointMaxAggregateOutputType = {
    id: number | null
    erpId: number | null
    name: string | null
    method: string | null
    pathTemplate: string | null
    bodyTemplate: string | null
    headers: string | null
    sortOrder: number | null
    group: string | null
    requiresClient: boolean | null
    isModification: boolean | null
    notes: string | null
  }

  export type EndpointCountAggregateOutputType = {
    id: number
    erpId: number
    name: number
    method: number
    pathTemplate: number
    bodyTemplate: number
    headers: number
    sortOrder: number
    group: number
    requiresClient: number
    isModification: number
    notes: number
    _all: number
  }


  export type EndpointAvgAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
  }

  export type EndpointSumAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
  }

  export type EndpointMinAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    method?: true
    pathTemplate?: true
    bodyTemplate?: true
    headers?: true
    sortOrder?: true
    group?: true
    requiresClient?: true
    isModification?: true
    notes?: true
  }

  export type EndpointMaxAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    method?: true
    pathTemplate?: true
    bodyTemplate?: true
    headers?: true
    sortOrder?: true
    group?: true
    requiresClient?: true
    isModification?: true
    notes?: true
  }

  export type EndpointCountAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    method?: true
    pathTemplate?: true
    bodyTemplate?: true
    headers?: true
    sortOrder?: true
    group?: true
    requiresClient?: true
    isModification?: true
    notes?: true
    _all?: true
  }

  export type EndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endpoint to aggregate.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Endpoints
    **/
    _count?: true | EndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EndpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EndpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EndpointMaxAggregateInputType
  }

  export type GetEndpointAggregateType<T extends EndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEndpoint[P]>
      : GetScalarType<T[P], AggregateEndpoint[P]>
  }




  export type EndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EndpointWhereInput
    orderBy?: EndpointOrderByWithAggregationInput | EndpointOrderByWithAggregationInput[]
    by: EndpointScalarFieldEnum[] | EndpointScalarFieldEnum
    having?: EndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EndpointCountAggregateInputType | true
    _avg?: EndpointAvgAggregateInputType
    _sum?: EndpointSumAggregateInputType
    _min?: EndpointMinAggregateInputType
    _max?: EndpointMaxAggregateInputType
  }

  export type EndpointGroupByOutputType = {
    id: number
    erpId: number
    name: string
    method: string
    pathTemplate: string
    bodyTemplate: string
    headers: string
    sortOrder: number
    group: string
    requiresClient: boolean
    isModification: boolean
    notes: string
    _count: EndpointCountAggregateOutputType | null
    _avg: EndpointAvgAggregateOutputType | null
    _sum: EndpointSumAggregateOutputType | null
    _min: EndpointMinAggregateOutputType | null
    _max: EndpointMaxAggregateOutputType | null
  }

  type GetEndpointGroupByPayload<T extends EndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EndpointGroupByOutputType[P]>
            : GetScalarType<T[P], EndpointGroupByOutputType[P]>
        }
      >
    >


  export type EndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    method?: boolean
    pathTemplate?: boolean
    bodyTemplate?: boolean
    headers?: boolean
    sortOrder?: boolean
    group?: boolean
    requiresClient?: boolean
    isModification?: boolean
    notes?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    playbookSteps?: boolean | Endpoint$playbookStepsArgs<ExtArgs>
    _count?: boolean | EndpointCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    method?: boolean
    pathTemplate?: boolean
    bodyTemplate?: boolean
    headers?: boolean
    sortOrder?: boolean
    group?: boolean
    requiresClient?: boolean
    isModification?: boolean
    notes?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    method?: boolean
    pathTemplate?: boolean
    bodyTemplate?: boolean
    headers?: boolean
    sortOrder?: boolean
    group?: boolean
    requiresClient?: boolean
    isModification?: boolean
    notes?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectScalar = {
    id?: boolean
    erpId?: boolean
    name?: boolean
    method?: boolean
    pathTemplate?: boolean
    bodyTemplate?: boolean
    headers?: boolean
    sortOrder?: boolean
    group?: boolean
    requiresClient?: boolean
    isModification?: boolean
    notes?: boolean
  }

  export type EndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpId" | "name" | "method" | "pathTemplate" | "bodyTemplate" | "headers" | "sortOrder" | "group" | "requiresClient" | "isModification" | "notes", ExtArgs["result"]["endpoint"]>
  export type EndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    playbookSteps?: boolean | Endpoint$playbookStepsArgs<ExtArgs>
    _count?: boolean | EndpointCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EndpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }
  export type EndpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }

  export type $EndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Endpoint"
    objects: {
      erp: Prisma.$ERPPayload<ExtArgs>
      playbookSteps: Prisma.$PlaybookStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      erpId: number
      name: string
      method: string
      pathTemplate: string
      bodyTemplate: string
      headers: string
      sortOrder: number
      group: string
      requiresClient: boolean
      isModification: boolean
      notes: string
    }, ExtArgs["result"]["endpoint"]>
    composites: {}
  }

  type EndpointGetPayload<S extends boolean | null | undefined | EndpointDefaultArgs> = $Result.GetResult<Prisma.$EndpointPayload, S>

  type EndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EndpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EndpointCountAggregateInputType | true
    }

  export interface EndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Endpoint'], meta: { name: 'Endpoint' } }
    /**
     * Find zero or one Endpoint that matches the filter.
     * @param {EndpointFindUniqueArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EndpointFindUniqueArgs>(args: SelectSubset<T, EndpointFindUniqueArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Endpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EndpointFindUniqueOrThrowArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, EndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindFirstArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EndpointFindFirstArgs>(args?: SelectSubset<T, EndpointFindFirstArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindFirstOrThrowArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, EndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Endpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Endpoints
     * const endpoints = await prisma.endpoint.findMany()
     * 
     * // Get first 10 Endpoints
     * const endpoints = await prisma.endpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const endpointWithIdOnly = await prisma.endpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EndpointFindManyArgs>(args?: SelectSubset<T, EndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Endpoint.
     * @param {EndpointCreateArgs} args - Arguments to create a Endpoint.
     * @example
     * // Create one Endpoint
     * const Endpoint = await prisma.endpoint.create({
     *   data: {
     *     // ... data to create a Endpoint
     *   }
     * })
     * 
     */
    create<T extends EndpointCreateArgs>(args: SelectSubset<T, EndpointCreateArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Endpoints.
     * @param {EndpointCreateManyArgs} args - Arguments to create many Endpoints.
     * @example
     * // Create many Endpoints
     * const endpoint = await prisma.endpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EndpointCreateManyArgs>(args?: SelectSubset<T, EndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Endpoints and returns the data saved in the database.
     * @param {EndpointCreateManyAndReturnArgs} args - Arguments to create many Endpoints.
     * @example
     * // Create many Endpoints
     * const endpoint = await prisma.endpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Endpoints and only return the `id`
     * const endpointWithIdOnly = await prisma.endpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, EndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Endpoint.
     * @param {EndpointDeleteArgs} args - Arguments to delete one Endpoint.
     * @example
     * // Delete one Endpoint
     * const Endpoint = await prisma.endpoint.delete({
     *   where: {
     *     // ... filter to delete one Endpoint
     *   }
     * })
     * 
     */
    delete<T extends EndpointDeleteArgs>(args: SelectSubset<T, EndpointDeleteArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Endpoint.
     * @param {EndpointUpdateArgs} args - Arguments to update one Endpoint.
     * @example
     * // Update one Endpoint
     * const endpoint = await prisma.endpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EndpointUpdateArgs>(args: SelectSubset<T, EndpointUpdateArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Endpoints.
     * @param {EndpointDeleteManyArgs} args - Arguments to filter Endpoints to delete.
     * @example
     * // Delete a few Endpoints
     * const { count } = await prisma.endpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EndpointDeleteManyArgs>(args?: SelectSubset<T, EndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Endpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Endpoints
     * const endpoint = await prisma.endpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EndpointUpdateManyArgs>(args: SelectSubset<T, EndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Endpoints and returns the data updated in the database.
     * @param {EndpointUpdateManyAndReturnArgs} args - Arguments to update many Endpoints.
     * @example
     * // Update many Endpoints
     * const endpoint = await prisma.endpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Endpoints and only return the `id`
     * const endpointWithIdOnly = await prisma.endpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EndpointUpdateManyAndReturnArgs>(args: SelectSubset<T, EndpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Endpoint.
     * @param {EndpointUpsertArgs} args - Arguments to update or create a Endpoint.
     * @example
     * // Update or create a Endpoint
     * const endpoint = await prisma.endpoint.upsert({
     *   create: {
     *     // ... data to create a Endpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Endpoint we want to update
     *   }
     * })
     */
    upsert<T extends EndpointUpsertArgs>(args: SelectSubset<T, EndpointUpsertArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Endpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointCountArgs} args - Arguments to filter Endpoints to count.
     * @example
     * // Count the number of Endpoints
     * const count = await prisma.endpoint.count({
     *   where: {
     *     // ... the filter for the Endpoints we want to count
     *   }
     * })
    **/
    count<T extends EndpointCountArgs>(
      args?: Subset<T, EndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Endpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EndpointAggregateArgs>(args: Subset<T, EndpointAggregateArgs>): Prisma.PrismaPromise<GetEndpointAggregateType<T>>

    /**
     * Group by Endpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EndpointGroupByArgs['orderBy'] }
        : { orderBy?: EndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Endpoint model
   */
  readonly fields: EndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Endpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    erp<T extends ERPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ERPDefaultArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playbookSteps<T extends Endpoint$playbookStepsArgs<ExtArgs> = {}>(args?: Subset<T, Endpoint$playbookStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Endpoint model
   */
  interface EndpointFieldRefs {
    readonly id: FieldRef<"Endpoint", 'Int'>
    readonly erpId: FieldRef<"Endpoint", 'Int'>
    readonly name: FieldRef<"Endpoint", 'String'>
    readonly method: FieldRef<"Endpoint", 'String'>
    readonly pathTemplate: FieldRef<"Endpoint", 'String'>
    readonly bodyTemplate: FieldRef<"Endpoint", 'String'>
    readonly headers: FieldRef<"Endpoint", 'String'>
    readonly sortOrder: FieldRef<"Endpoint", 'Int'>
    readonly group: FieldRef<"Endpoint", 'String'>
    readonly requiresClient: FieldRef<"Endpoint", 'Boolean'>
    readonly isModification: FieldRef<"Endpoint", 'Boolean'>
    readonly notes: FieldRef<"Endpoint", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Endpoint findUnique
   */
  export type EndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint findUniqueOrThrow
   */
  export type EndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint findFirst
   */
  export type EndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Endpoints.
     */
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint findFirstOrThrow
   */
  export type EndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Endpoints.
     */
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint findMany
   */
  export type EndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoints to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint create
   */
  export type EndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The data needed to create a Endpoint.
     */
    data: XOR<EndpointCreateInput, EndpointUncheckedCreateInput>
  }

  /**
   * Endpoint createMany
   */
  export type EndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Endpoints.
     */
    data: EndpointCreateManyInput | EndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Endpoint createManyAndReturn
   */
  export type EndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * The data used to create many Endpoints.
     */
    data: EndpointCreateManyInput | EndpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endpoint update
   */
  export type EndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The data needed to update a Endpoint.
     */
    data: XOR<EndpointUpdateInput, EndpointUncheckedUpdateInput>
    /**
     * Choose, which Endpoint to update.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint updateMany
   */
  export type EndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Endpoints.
     */
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyInput>
    /**
     * Filter which Endpoints to update
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to update.
     */
    limit?: number
  }

  /**
   * Endpoint updateManyAndReturn
   */
  export type EndpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * The data used to update Endpoints.
     */
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyInput>
    /**
     * Filter which Endpoints to update
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endpoint upsert
   */
  export type EndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The filter to search for the Endpoint to update in case it exists.
     */
    where: EndpointWhereUniqueInput
    /**
     * In case the Endpoint found by the `where` argument doesn't exist, create a new Endpoint with this data.
     */
    create: XOR<EndpointCreateInput, EndpointUncheckedCreateInput>
    /**
     * In case the Endpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EndpointUpdateInput, EndpointUncheckedUpdateInput>
  }

  /**
   * Endpoint delete
   */
  export type EndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter which Endpoint to delete.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint deleteMany
   */
  export type EndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endpoints to delete
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to delete.
     */
    limit?: number
  }

  /**
   * Endpoint.playbookSteps
   */
  export type Endpoint$playbookStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    where?: PlaybookStepWhereInput
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    cursor?: PlaybookStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybookStepScalarFieldEnum | PlaybookStepScalarFieldEnum[]
  }

  /**
   * Endpoint without action
   */
  export type EndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
    erpId: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
    erpId: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    erpId: number | null
    baseUrl: string | null
    authType: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    erpId: number | null
    baseUrl: string | null
    authType: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    erpId: number
    baseUrl: number
    environments: number
    authType: number
    authConfig: number
    notes: number
    createdAt: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
    erpId?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
    erpId?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    erpId?: true
    baseUrl?: true
    authType?: true
    notes?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    erpId?: true
    baseUrl?: true
    authType?: true
    notes?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    erpId?: true
    baseUrl?: true
    environments?: true
    authType?: true
    authConfig?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    erpId: number
    baseUrl: string
    environments: JsonValue
    authType: string
    authConfig: JsonValue
    notes: string
    createdAt: Date
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    environments?: boolean
    authType?: boolean
    authConfig?: boolean
    notes?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    testClients?: boolean | Company$testClientsArgs<ExtArgs>
    playbookRuns?: boolean | Company$playbookRunsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    environments?: boolean
    authType?: boolean
    authConfig?: boolean
    notes?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    environments?: boolean
    authType?: boolean
    authConfig?: boolean
    notes?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    environments?: boolean
    authType?: boolean
    authConfig?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "erpId" | "baseUrl" | "environments" | "authType" | "authConfig" | "notes" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    testClients?: boolean | Company$testClientsArgs<ExtArgs>
    playbookRuns?: boolean | Company$playbookRunsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      erp: Prisma.$ERPPayload<ExtArgs>
      testClients: Prisma.$TestClientPayload<ExtArgs>[]
      playbookRuns: Prisma.$PlaybookRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      erpId: number
      baseUrl: string
      environments: Prisma.JsonValue
      authType: string
      authConfig: Prisma.JsonValue
      notes: string
      createdAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    erp<T extends ERPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ERPDefaultArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testClients<T extends Company$testClientsArgs<ExtArgs> = {}>(args?: Subset<T, Company$testClientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playbookRuns<T extends Company$playbookRunsArgs<ExtArgs> = {}>(args?: Subset<T, Company$playbookRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly erpId: FieldRef<"Company", 'Int'>
    readonly baseUrl: FieldRef<"Company", 'String'>
    readonly environments: FieldRef<"Company", 'Json'>
    readonly authType: FieldRef<"Company", 'String'>
    readonly authConfig: FieldRef<"Company", 'Json'>
    readonly notes: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.testClients
   */
  export type Company$testClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    where?: TestClientWhereInput
    orderBy?: TestClientOrderByWithRelationInput | TestClientOrderByWithRelationInput[]
    cursor?: TestClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestClientScalarFieldEnum | TestClientScalarFieldEnum[]
  }

  /**
   * Company.playbookRuns
   */
  export type Company$playbookRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    where?: PlaybookRunWhereInput
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    cursor?: PlaybookRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybookRunScalarFieldEnum | PlaybookRunScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model TestClient
   */

  export type AggregateTestClient = {
    _count: TestClientCountAggregateOutputType | null
    _avg: TestClientAvgAggregateOutputType | null
    _sum: TestClientSumAggregateOutputType | null
    _min: TestClientMinAggregateOutputType | null
    _max: TestClientMaxAggregateOutputType | null
  }

  export type TestClientAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type TestClientSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type TestClientMinAggregateOutputType = {
    id: number | null
    name: string | null
    companyId: number | null
    createdAt: Date | null
  }

  export type TestClientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    companyId: number | null
    createdAt: Date | null
  }

  export type TestClientCountAggregateOutputType = {
    id: number
    name: number
    companyId: number
    fieldsData: number
    createdAt: number
    _all: number
  }


  export type TestClientAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type TestClientSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type TestClientMinAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type TestClientMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type TestClientCountAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    fieldsData?: true
    createdAt?: true
    _all?: true
  }

  export type TestClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestClient to aggregate.
     */
    where?: TestClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestClients to fetch.
     */
    orderBy?: TestClientOrderByWithRelationInput | TestClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestClients
    **/
    _count?: true | TestClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestClientMaxAggregateInputType
  }

  export type GetTestClientAggregateType<T extends TestClientAggregateArgs> = {
        [P in keyof T & keyof AggregateTestClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestClient[P]>
      : GetScalarType<T[P], AggregateTestClient[P]>
  }




  export type TestClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestClientWhereInput
    orderBy?: TestClientOrderByWithAggregationInput | TestClientOrderByWithAggregationInput[]
    by: TestClientScalarFieldEnum[] | TestClientScalarFieldEnum
    having?: TestClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestClientCountAggregateInputType | true
    _avg?: TestClientAvgAggregateInputType
    _sum?: TestClientSumAggregateInputType
    _min?: TestClientMinAggregateInputType
    _max?: TestClientMaxAggregateInputType
  }

  export type TestClientGroupByOutputType = {
    id: number
    name: string
    companyId: number
    fieldsData: JsonValue
    createdAt: Date
    _count: TestClientCountAggregateOutputType | null
    _avg: TestClientAvgAggregateOutputType | null
    _sum: TestClientSumAggregateOutputType | null
    _min: TestClientMinAggregateOutputType | null
    _max: TestClientMaxAggregateOutputType | null
  }

  type GetTestClientGroupByPayload<T extends TestClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestClientGroupByOutputType[P]>
            : GetScalarType<T[P], TestClientGroupByOutputType[P]>
        }
      >
    >


  export type TestClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    fieldsData?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testClient"]>

  export type TestClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    fieldsData?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testClient"]>

  export type TestClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    fieldsData?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testClient"]>

  export type TestClientSelectScalar = {
    id?: boolean
    name?: boolean
    companyId?: boolean
    fieldsData?: boolean
    createdAt?: boolean
  }

  export type TestClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "companyId" | "fieldsData" | "createdAt", ExtArgs["result"]["testClient"]>
  export type TestClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type TestClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type TestClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $TestClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestClient"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      companyId: number
      fieldsData: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["testClient"]>
    composites: {}
  }

  type TestClientGetPayload<S extends boolean | null | undefined | TestClientDefaultArgs> = $Result.GetResult<Prisma.$TestClientPayload, S>

  type TestClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestClientCountAggregateInputType | true
    }

  export interface TestClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestClient'], meta: { name: 'TestClient' } }
    /**
     * Find zero or one TestClient that matches the filter.
     * @param {TestClientFindUniqueArgs} args - Arguments to find a TestClient
     * @example
     * // Get one TestClient
     * const testClient = await prisma.testClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestClientFindUniqueArgs>(args: SelectSubset<T, TestClientFindUniqueArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestClientFindUniqueOrThrowArgs} args - Arguments to find a TestClient
     * @example
     * // Get one TestClient
     * const testClient = await prisma.testClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestClientFindUniqueOrThrowArgs>(args: SelectSubset<T, TestClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientFindFirstArgs} args - Arguments to find a TestClient
     * @example
     * // Get one TestClient
     * const testClient = await prisma.testClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestClientFindFirstArgs>(args?: SelectSubset<T, TestClientFindFirstArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientFindFirstOrThrowArgs} args - Arguments to find a TestClient
     * @example
     * // Get one TestClient
     * const testClient = await prisma.testClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestClientFindFirstOrThrowArgs>(args?: SelectSubset<T, TestClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestClients
     * const testClients = await prisma.testClient.findMany()
     * 
     * // Get first 10 TestClients
     * const testClients = await prisma.testClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testClientWithIdOnly = await prisma.testClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestClientFindManyArgs>(args?: SelectSubset<T, TestClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestClient.
     * @param {TestClientCreateArgs} args - Arguments to create a TestClient.
     * @example
     * // Create one TestClient
     * const TestClient = await prisma.testClient.create({
     *   data: {
     *     // ... data to create a TestClient
     *   }
     * })
     * 
     */
    create<T extends TestClientCreateArgs>(args: SelectSubset<T, TestClientCreateArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestClients.
     * @param {TestClientCreateManyArgs} args - Arguments to create many TestClients.
     * @example
     * // Create many TestClients
     * const testClient = await prisma.testClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestClientCreateManyArgs>(args?: SelectSubset<T, TestClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestClients and returns the data saved in the database.
     * @param {TestClientCreateManyAndReturnArgs} args - Arguments to create many TestClients.
     * @example
     * // Create many TestClients
     * const testClient = await prisma.testClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestClients and only return the `id`
     * const testClientWithIdOnly = await prisma.testClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestClientCreateManyAndReturnArgs>(args?: SelectSubset<T, TestClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestClient.
     * @param {TestClientDeleteArgs} args - Arguments to delete one TestClient.
     * @example
     * // Delete one TestClient
     * const TestClient = await prisma.testClient.delete({
     *   where: {
     *     // ... filter to delete one TestClient
     *   }
     * })
     * 
     */
    delete<T extends TestClientDeleteArgs>(args: SelectSubset<T, TestClientDeleteArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestClient.
     * @param {TestClientUpdateArgs} args - Arguments to update one TestClient.
     * @example
     * // Update one TestClient
     * const testClient = await prisma.testClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestClientUpdateArgs>(args: SelectSubset<T, TestClientUpdateArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestClients.
     * @param {TestClientDeleteManyArgs} args - Arguments to filter TestClients to delete.
     * @example
     * // Delete a few TestClients
     * const { count } = await prisma.testClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestClientDeleteManyArgs>(args?: SelectSubset<T, TestClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestClients
     * const testClient = await prisma.testClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestClientUpdateManyArgs>(args: SelectSubset<T, TestClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestClients and returns the data updated in the database.
     * @param {TestClientUpdateManyAndReturnArgs} args - Arguments to update many TestClients.
     * @example
     * // Update many TestClients
     * const testClient = await prisma.testClient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestClients and only return the `id`
     * const testClientWithIdOnly = await prisma.testClient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestClientUpdateManyAndReturnArgs>(args: SelectSubset<T, TestClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestClient.
     * @param {TestClientUpsertArgs} args - Arguments to update or create a TestClient.
     * @example
     * // Update or create a TestClient
     * const testClient = await prisma.testClient.upsert({
     *   create: {
     *     // ... data to create a TestClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestClient we want to update
     *   }
     * })
     */
    upsert<T extends TestClientUpsertArgs>(args: SelectSubset<T, TestClientUpsertArgs<ExtArgs>>): Prisma__TestClientClient<$Result.GetResult<Prisma.$TestClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientCountArgs} args - Arguments to filter TestClients to count.
     * @example
     * // Count the number of TestClients
     * const count = await prisma.testClient.count({
     *   where: {
     *     // ... the filter for the TestClients we want to count
     *   }
     * })
    **/
    count<T extends TestClientCountArgs>(
      args?: Subset<T, TestClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestClientAggregateArgs>(args: Subset<T, TestClientAggregateArgs>): Prisma.PrismaPromise<GetTestClientAggregateType<T>>

    /**
     * Group by TestClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestClientGroupByArgs['orderBy'] }
        : { orderBy?: TestClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestClient model
   */
  readonly fields: TestClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestClient model
   */
  interface TestClientFieldRefs {
    readonly id: FieldRef<"TestClient", 'Int'>
    readonly name: FieldRef<"TestClient", 'String'>
    readonly companyId: FieldRef<"TestClient", 'Int'>
    readonly fieldsData: FieldRef<"TestClient", 'Json'>
    readonly createdAt: FieldRef<"TestClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestClient findUnique
   */
  export type TestClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter, which TestClient to fetch.
     */
    where: TestClientWhereUniqueInput
  }

  /**
   * TestClient findUniqueOrThrow
   */
  export type TestClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter, which TestClient to fetch.
     */
    where: TestClientWhereUniqueInput
  }

  /**
   * TestClient findFirst
   */
  export type TestClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter, which TestClient to fetch.
     */
    where?: TestClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestClients to fetch.
     */
    orderBy?: TestClientOrderByWithRelationInput | TestClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestClients.
     */
    cursor?: TestClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestClients.
     */
    distinct?: TestClientScalarFieldEnum | TestClientScalarFieldEnum[]
  }

  /**
   * TestClient findFirstOrThrow
   */
  export type TestClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter, which TestClient to fetch.
     */
    where?: TestClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestClients to fetch.
     */
    orderBy?: TestClientOrderByWithRelationInput | TestClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestClients.
     */
    cursor?: TestClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestClients.
     */
    distinct?: TestClientScalarFieldEnum | TestClientScalarFieldEnum[]
  }

  /**
   * TestClient findMany
   */
  export type TestClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter, which TestClients to fetch.
     */
    where?: TestClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestClients to fetch.
     */
    orderBy?: TestClientOrderByWithRelationInput | TestClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestClients.
     */
    cursor?: TestClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestClients.
     */
    skip?: number
    distinct?: TestClientScalarFieldEnum | TestClientScalarFieldEnum[]
  }

  /**
   * TestClient create
   */
  export type TestClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * The data needed to create a TestClient.
     */
    data: XOR<TestClientCreateInput, TestClientUncheckedCreateInput>
  }

  /**
   * TestClient createMany
   */
  export type TestClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestClients.
     */
    data: TestClientCreateManyInput | TestClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestClient createManyAndReturn
   */
  export type TestClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * The data used to create many TestClients.
     */
    data: TestClientCreateManyInput | TestClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestClient update
   */
  export type TestClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * The data needed to update a TestClient.
     */
    data: XOR<TestClientUpdateInput, TestClientUncheckedUpdateInput>
    /**
     * Choose, which TestClient to update.
     */
    where: TestClientWhereUniqueInput
  }

  /**
   * TestClient updateMany
   */
  export type TestClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestClients.
     */
    data: XOR<TestClientUpdateManyMutationInput, TestClientUncheckedUpdateManyInput>
    /**
     * Filter which TestClients to update
     */
    where?: TestClientWhereInput
    /**
     * Limit how many TestClients to update.
     */
    limit?: number
  }

  /**
   * TestClient updateManyAndReturn
   */
  export type TestClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * The data used to update TestClients.
     */
    data: XOR<TestClientUpdateManyMutationInput, TestClientUncheckedUpdateManyInput>
    /**
     * Filter which TestClients to update
     */
    where?: TestClientWhereInput
    /**
     * Limit how many TestClients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestClient upsert
   */
  export type TestClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * The filter to search for the TestClient to update in case it exists.
     */
    where: TestClientWhereUniqueInput
    /**
     * In case the TestClient found by the `where` argument doesn't exist, create a new TestClient with this data.
     */
    create: XOR<TestClientCreateInput, TestClientUncheckedCreateInput>
    /**
     * In case the TestClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestClientUpdateInput, TestClientUncheckedUpdateInput>
  }

  /**
   * TestClient delete
   */
  export type TestClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
    /**
     * Filter which TestClient to delete.
     */
    where: TestClientWhereUniqueInput
  }

  /**
   * TestClient deleteMany
   */
  export type TestClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestClients to delete
     */
    where?: TestClientWhereInput
    /**
     * Limit how many TestClients to delete.
     */
    limit?: number
  }

  /**
   * TestClient without action
   */
  export type TestClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestClient
     */
    select?: TestClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestClient
     */
    omit?: TestClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestClientInclude<ExtArgs> | null
  }


  /**
   * Model PostmanCollection
   */

  export type AggregatePostmanCollection = {
    _count: PostmanCollectionCountAggregateOutputType | null
    _avg: PostmanCollectionAvgAggregateOutputType | null
    _sum: PostmanCollectionSumAggregateOutputType | null
    _min: PostmanCollectionMinAggregateOutputType | null
    _max: PostmanCollectionMaxAggregateOutputType | null
  }

  export type PostmanCollectionAvgAggregateOutputType = {
    id: number | null
  }

  export type PostmanCollectionSumAggregateOutputType = {
    id: number | null
  }

  export type PostmanCollectionMinAggregateOutputType = {
    id: number | null
    name: string | null
    context: string | null
    systemPrompt: string | null
    embeddingProvider: string | null
    createdAt: Date | null
  }

  export type PostmanCollectionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    context: string | null
    systemPrompt: string | null
    embeddingProvider: string | null
    createdAt: Date | null
  }

  export type PostmanCollectionCountAggregateOutputType = {
    id: number
    name: number
    context: number
    systemPrompt: number
    embeddingProvider: number
    rawJson: number
    createdAt: number
    _all: number
  }


  export type PostmanCollectionAvgAggregateInputType = {
    id?: true
  }

  export type PostmanCollectionSumAggregateInputType = {
    id?: true
  }

  export type PostmanCollectionMinAggregateInputType = {
    id?: true
    name?: true
    context?: true
    systemPrompt?: true
    embeddingProvider?: true
    createdAt?: true
  }

  export type PostmanCollectionMaxAggregateInputType = {
    id?: true
    name?: true
    context?: true
    systemPrompt?: true
    embeddingProvider?: true
    createdAt?: true
  }

  export type PostmanCollectionCountAggregateInputType = {
    id?: true
    name?: true
    context?: true
    systemPrompt?: true
    embeddingProvider?: true
    rawJson?: true
    createdAt?: true
    _all?: true
  }

  export type PostmanCollectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostmanCollection to aggregate.
     */
    where?: PostmanCollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostmanCollections to fetch.
     */
    orderBy?: PostmanCollectionOrderByWithRelationInput | PostmanCollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostmanCollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostmanCollections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostmanCollections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostmanCollections
    **/
    _count?: true | PostmanCollectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostmanCollectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostmanCollectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostmanCollectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostmanCollectionMaxAggregateInputType
  }

  export type GetPostmanCollectionAggregateType<T extends PostmanCollectionAggregateArgs> = {
        [P in keyof T & keyof AggregatePostmanCollection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostmanCollection[P]>
      : GetScalarType<T[P], AggregatePostmanCollection[P]>
  }




  export type PostmanCollectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostmanCollectionWhereInput
    orderBy?: PostmanCollectionOrderByWithAggregationInput | PostmanCollectionOrderByWithAggregationInput[]
    by: PostmanCollectionScalarFieldEnum[] | PostmanCollectionScalarFieldEnum
    having?: PostmanCollectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostmanCollectionCountAggregateInputType | true
    _avg?: PostmanCollectionAvgAggregateInputType
    _sum?: PostmanCollectionSumAggregateInputType
    _min?: PostmanCollectionMinAggregateInputType
    _max?: PostmanCollectionMaxAggregateInputType
  }

  export type PostmanCollectionGroupByOutputType = {
    id: number
    name: string
    context: string
    systemPrompt: string
    embeddingProvider: string
    rawJson: JsonValue | null
    createdAt: Date
    _count: PostmanCollectionCountAggregateOutputType | null
    _avg: PostmanCollectionAvgAggregateOutputType | null
    _sum: PostmanCollectionSumAggregateOutputType | null
    _min: PostmanCollectionMinAggregateOutputType | null
    _max: PostmanCollectionMaxAggregateOutputType | null
  }

  type GetPostmanCollectionGroupByPayload<T extends PostmanCollectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostmanCollectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostmanCollectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostmanCollectionGroupByOutputType[P]>
            : GetScalarType<T[P], PostmanCollectionGroupByOutputType[P]>
        }
      >
    >


  export type PostmanCollectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    context?: boolean
    systemPrompt?: boolean
    embeddingProvider?: boolean
    rawJson?: boolean
    createdAt?: boolean
    chunks?: boolean | PostmanCollection$chunksArgs<ExtArgs>
    _count?: boolean | PostmanCollectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postmanCollection"]>

  export type PostmanCollectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    context?: boolean
    systemPrompt?: boolean
    embeddingProvider?: boolean
    rawJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["postmanCollection"]>

  export type PostmanCollectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    context?: boolean
    systemPrompt?: boolean
    embeddingProvider?: boolean
    rawJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["postmanCollection"]>

  export type PostmanCollectionSelectScalar = {
    id?: boolean
    name?: boolean
    context?: boolean
    systemPrompt?: boolean
    embeddingProvider?: boolean
    rawJson?: boolean
    createdAt?: boolean
  }

  export type PostmanCollectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "context" | "systemPrompt" | "embeddingProvider" | "rawJson" | "createdAt", ExtArgs["result"]["postmanCollection"]>
  export type PostmanCollectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | PostmanCollection$chunksArgs<ExtArgs>
    _count?: boolean | PostmanCollectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostmanCollectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PostmanCollectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PostmanCollectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostmanCollection"
    objects: {
      chunks: Prisma.$EmbeddingChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      context: string
      systemPrompt: string
      embeddingProvider: string
      rawJson: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["postmanCollection"]>
    composites: {}
  }

  type PostmanCollectionGetPayload<S extends boolean | null | undefined | PostmanCollectionDefaultArgs> = $Result.GetResult<Prisma.$PostmanCollectionPayload, S>

  type PostmanCollectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostmanCollectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostmanCollectionCountAggregateInputType | true
    }

  export interface PostmanCollectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostmanCollection'], meta: { name: 'PostmanCollection' } }
    /**
     * Find zero or one PostmanCollection that matches the filter.
     * @param {PostmanCollectionFindUniqueArgs} args - Arguments to find a PostmanCollection
     * @example
     * // Get one PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostmanCollectionFindUniqueArgs>(args: SelectSubset<T, PostmanCollectionFindUniqueArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostmanCollection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostmanCollectionFindUniqueOrThrowArgs} args - Arguments to find a PostmanCollection
     * @example
     * // Get one PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostmanCollectionFindUniqueOrThrowArgs>(args: SelectSubset<T, PostmanCollectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostmanCollection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionFindFirstArgs} args - Arguments to find a PostmanCollection
     * @example
     * // Get one PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostmanCollectionFindFirstArgs>(args?: SelectSubset<T, PostmanCollectionFindFirstArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostmanCollection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionFindFirstOrThrowArgs} args - Arguments to find a PostmanCollection
     * @example
     * // Get one PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostmanCollectionFindFirstOrThrowArgs>(args?: SelectSubset<T, PostmanCollectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostmanCollections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostmanCollections
     * const postmanCollections = await prisma.postmanCollection.findMany()
     * 
     * // Get first 10 PostmanCollections
     * const postmanCollections = await prisma.postmanCollection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postmanCollectionWithIdOnly = await prisma.postmanCollection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostmanCollectionFindManyArgs>(args?: SelectSubset<T, PostmanCollectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostmanCollection.
     * @param {PostmanCollectionCreateArgs} args - Arguments to create a PostmanCollection.
     * @example
     * // Create one PostmanCollection
     * const PostmanCollection = await prisma.postmanCollection.create({
     *   data: {
     *     // ... data to create a PostmanCollection
     *   }
     * })
     * 
     */
    create<T extends PostmanCollectionCreateArgs>(args: SelectSubset<T, PostmanCollectionCreateArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostmanCollections.
     * @param {PostmanCollectionCreateManyArgs} args - Arguments to create many PostmanCollections.
     * @example
     * // Create many PostmanCollections
     * const postmanCollection = await prisma.postmanCollection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostmanCollectionCreateManyArgs>(args?: SelectSubset<T, PostmanCollectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostmanCollections and returns the data saved in the database.
     * @param {PostmanCollectionCreateManyAndReturnArgs} args - Arguments to create many PostmanCollections.
     * @example
     * // Create many PostmanCollections
     * const postmanCollection = await prisma.postmanCollection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostmanCollections and only return the `id`
     * const postmanCollectionWithIdOnly = await prisma.postmanCollection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostmanCollectionCreateManyAndReturnArgs>(args?: SelectSubset<T, PostmanCollectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostmanCollection.
     * @param {PostmanCollectionDeleteArgs} args - Arguments to delete one PostmanCollection.
     * @example
     * // Delete one PostmanCollection
     * const PostmanCollection = await prisma.postmanCollection.delete({
     *   where: {
     *     // ... filter to delete one PostmanCollection
     *   }
     * })
     * 
     */
    delete<T extends PostmanCollectionDeleteArgs>(args: SelectSubset<T, PostmanCollectionDeleteArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostmanCollection.
     * @param {PostmanCollectionUpdateArgs} args - Arguments to update one PostmanCollection.
     * @example
     * // Update one PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostmanCollectionUpdateArgs>(args: SelectSubset<T, PostmanCollectionUpdateArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostmanCollections.
     * @param {PostmanCollectionDeleteManyArgs} args - Arguments to filter PostmanCollections to delete.
     * @example
     * // Delete a few PostmanCollections
     * const { count } = await prisma.postmanCollection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostmanCollectionDeleteManyArgs>(args?: SelectSubset<T, PostmanCollectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostmanCollections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostmanCollections
     * const postmanCollection = await prisma.postmanCollection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostmanCollectionUpdateManyArgs>(args: SelectSubset<T, PostmanCollectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostmanCollections and returns the data updated in the database.
     * @param {PostmanCollectionUpdateManyAndReturnArgs} args - Arguments to update many PostmanCollections.
     * @example
     * // Update many PostmanCollections
     * const postmanCollection = await prisma.postmanCollection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostmanCollections and only return the `id`
     * const postmanCollectionWithIdOnly = await prisma.postmanCollection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostmanCollectionUpdateManyAndReturnArgs>(args: SelectSubset<T, PostmanCollectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostmanCollection.
     * @param {PostmanCollectionUpsertArgs} args - Arguments to update or create a PostmanCollection.
     * @example
     * // Update or create a PostmanCollection
     * const postmanCollection = await prisma.postmanCollection.upsert({
     *   create: {
     *     // ... data to create a PostmanCollection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostmanCollection we want to update
     *   }
     * })
     */
    upsert<T extends PostmanCollectionUpsertArgs>(args: SelectSubset<T, PostmanCollectionUpsertArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostmanCollections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionCountArgs} args - Arguments to filter PostmanCollections to count.
     * @example
     * // Count the number of PostmanCollections
     * const count = await prisma.postmanCollection.count({
     *   where: {
     *     // ... the filter for the PostmanCollections we want to count
     *   }
     * })
    **/
    count<T extends PostmanCollectionCountArgs>(
      args?: Subset<T, PostmanCollectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostmanCollectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostmanCollection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostmanCollectionAggregateArgs>(args: Subset<T, PostmanCollectionAggregateArgs>): Prisma.PrismaPromise<GetPostmanCollectionAggregateType<T>>

    /**
     * Group by PostmanCollection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostmanCollectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostmanCollectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostmanCollectionGroupByArgs['orderBy'] }
        : { orderBy?: PostmanCollectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostmanCollectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostmanCollectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostmanCollection model
   */
  readonly fields: PostmanCollectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostmanCollection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostmanCollectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chunks<T extends PostmanCollection$chunksArgs<ExtArgs> = {}>(args?: Subset<T, PostmanCollection$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostmanCollection model
   */
  interface PostmanCollectionFieldRefs {
    readonly id: FieldRef<"PostmanCollection", 'Int'>
    readonly name: FieldRef<"PostmanCollection", 'String'>
    readonly context: FieldRef<"PostmanCollection", 'String'>
    readonly systemPrompt: FieldRef<"PostmanCollection", 'String'>
    readonly embeddingProvider: FieldRef<"PostmanCollection", 'String'>
    readonly rawJson: FieldRef<"PostmanCollection", 'Json'>
    readonly createdAt: FieldRef<"PostmanCollection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostmanCollection findUnique
   */
  export type PostmanCollectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter, which PostmanCollection to fetch.
     */
    where: PostmanCollectionWhereUniqueInput
  }

  /**
   * PostmanCollection findUniqueOrThrow
   */
  export type PostmanCollectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter, which PostmanCollection to fetch.
     */
    where: PostmanCollectionWhereUniqueInput
  }

  /**
   * PostmanCollection findFirst
   */
  export type PostmanCollectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter, which PostmanCollection to fetch.
     */
    where?: PostmanCollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostmanCollections to fetch.
     */
    orderBy?: PostmanCollectionOrderByWithRelationInput | PostmanCollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostmanCollections.
     */
    cursor?: PostmanCollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostmanCollections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostmanCollections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostmanCollections.
     */
    distinct?: PostmanCollectionScalarFieldEnum | PostmanCollectionScalarFieldEnum[]
  }

  /**
   * PostmanCollection findFirstOrThrow
   */
  export type PostmanCollectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter, which PostmanCollection to fetch.
     */
    where?: PostmanCollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostmanCollections to fetch.
     */
    orderBy?: PostmanCollectionOrderByWithRelationInput | PostmanCollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostmanCollections.
     */
    cursor?: PostmanCollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostmanCollections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostmanCollections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostmanCollections.
     */
    distinct?: PostmanCollectionScalarFieldEnum | PostmanCollectionScalarFieldEnum[]
  }

  /**
   * PostmanCollection findMany
   */
  export type PostmanCollectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter, which PostmanCollections to fetch.
     */
    where?: PostmanCollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostmanCollections to fetch.
     */
    orderBy?: PostmanCollectionOrderByWithRelationInput | PostmanCollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostmanCollections.
     */
    cursor?: PostmanCollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostmanCollections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostmanCollections.
     */
    skip?: number
    distinct?: PostmanCollectionScalarFieldEnum | PostmanCollectionScalarFieldEnum[]
  }

  /**
   * PostmanCollection create
   */
  export type PostmanCollectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * The data needed to create a PostmanCollection.
     */
    data: XOR<PostmanCollectionCreateInput, PostmanCollectionUncheckedCreateInput>
  }

  /**
   * PostmanCollection createMany
   */
  export type PostmanCollectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostmanCollections.
     */
    data: PostmanCollectionCreateManyInput | PostmanCollectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostmanCollection createManyAndReturn
   */
  export type PostmanCollectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * The data used to create many PostmanCollections.
     */
    data: PostmanCollectionCreateManyInput | PostmanCollectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostmanCollection update
   */
  export type PostmanCollectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * The data needed to update a PostmanCollection.
     */
    data: XOR<PostmanCollectionUpdateInput, PostmanCollectionUncheckedUpdateInput>
    /**
     * Choose, which PostmanCollection to update.
     */
    where: PostmanCollectionWhereUniqueInput
  }

  /**
   * PostmanCollection updateMany
   */
  export type PostmanCollectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostmanCollections.
     */
    data: XOR<PostmanCollectionUpdateManyMutationInput, PostmanCollectionUncheckedUpdateManyInput>
    /**
     * Filter which PostmanCollections to update
     */
    where?: PostmanCollectionWhereInput
    /**
     * Limit how many PostmanCollections to update.
     */
    limit?: number
  }

  /**
   * PostmanCollection updateManyAndReturn
   */
  export type PostmanCollectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * The data used to update PostmanCollections.
     */
    data: XOR<PostmanCollectionUpdateManyMutationInput, PostmanCollectionUncheckedUpdateManyInput>
    /**
     * Filter which PostmanCollections to update
     */
    where?: PostmanCollectionWhereInput
    /**
     * Limit how many PostmanCollections to update.
     */
    limit?: number
  }

  /**
   * PostmanCollection upsert
   */
  export type PostmanCollectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * The filter to search for the PostmanCollection to update in case it exists.
     */
    where: PostmanCollectionWhereUniqueInput
    /**
     * In case the PostmanCollection found by the `where` argument doesn't exist, create a new PostmanCollection with this data.
     */
    create: XOR<PostmanCollectionCreateInput, PostmanCollectionUncheckedCreateInput>
    /**
     * In case the PostmanCollection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostmanCollectionUpdateInput, PostmanCollectionUncheckedUpdateInput>
  }

  /**
   * PostmanCollection delete
   */
  export type PostmanCollectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
    /**
     * Filter which PostmanCollection to delete.
     */
    where: PostmanCollectionWhereUniqueInput
  }

  /**
   * PostmanCollection deleteMany
   */
  export type PostmanCollectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostmanCollections to delete
     */
    where?: PostmanCollectionWhereInput
    /**
     * Limit how many PostmanCollections to delete.
     */
    limit?: number
  }

  /**
   * PostmanCollection.chunks
   */
  export type PostmanCollection$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    where?: EmbeddingChunkWhereInput
    orderBy?: EmbeddingChunkOrderByWithRelationInput | EmbeddingChunkOrderByWithRelationInput[]
    cursor?: EmbeddingChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmbeddingChunkScalarFieldEnum | EmbeddingChunkScalarFieldEnum[]
  }

  /**
   * PostmanCollection without action
   */
  export type PostmanCollectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostmanCollection
     */
    select?: PostmanCollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostmanCollection
     */
    omit?: PostmanCollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostmanCollectionInclude<ExtArgs> | null
  }


  /**
   * Model EmbeddingChunk
   */

  export type AggregateEmbeddingChunk = {
    _count: EmbeddingChunkCountAggregateOutputType | null
    _avg: EmbeddingChunkAvgAggregateOutputType | null
    _sum: EmbeddingChunkSumAggregateOutputType | null
    _min: EmbeddingChunkMinAggregateOutputType | null
    _max: EmbeddingChunkMaxAggregateOutputType | null
  }

  export type EmbeddingChunkAvgAggregateOutputType = {
    id: number | null
    collectionId: number | null
  }

  export type EmbeddingChunkSumAggregateOutputType = {
    id: number | null
    collectionId: number | null
  }

  export type EmbeddingChunkMinAggregateOutputType = {
    id: number | null
    collectionId: number | null
    text: string | null
  }

  export type EmbeddingChunkMaxAggregateOutputType = {
    id: number | null
    collectionId: number | null
    text: string | null
  }

  export type EmbeddingChunkCountAggregateOutputType = {
    id: number
    collectionId: number
    text: number
    _all: number
  }


  export type EmbeddingChunkAvgAggregateInputType = {
    id?: true
    collectionId?: true
  }

  export type EmbeddingChunkSumAggregateInputType = {
    id?: true
    collectionId?: true
  }

  export type EmbeddingChunkMinAggregateInputType = {
    id?: true
    collectionId?: true
    text?: true
  }

  export type EmbeddingChunkMaxAggregateInputType = {
    id?: true
    collectionId?: true
    text?: true
  }

  export type EmbeddingChunkCountAggregateInputType = {
    id?: true
    collectionId?: true
    text?: true
    _all?: true
  }

  export type EmbeddingChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbeddingChunk to aggregate.
     */
    where?: EmbeddingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingChunks to fetch.
     */
    orderBy?: EmbeddingChunkOrderByWithRelationInput | EmbeddingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbeddingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmbeddingChunks
    **/
    _count?: true | EmbeddingChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmbeddingChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmbeddingChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbeddingChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbeddingChunkMaxAggregateInputType
  }

  export type GetEmbeddingChunkAggregateType<T extends EmbeddingChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbeddingChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbeddingChunk[P]>
      : GetScalarType<T[P], AggregateEmbeddingChunk[P]>
  }




  export type EmbeddingChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbeddingChunkWhereInput
    orderBy?: EmbeddingChunkOrderByWithAggregationInput | EmbeddingChunkOrderByWithAggregationInput[]
    by: EmbeddingChunkScalarFieldEnum[] | EmbeddingChunkScalarFieldEnum
    having?: EmbeddingChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbeddingChunkCountAggregateInputType | true
    _avg?: EmbeddingChunkAvgAggregateInputType
    _sum?: EmbeddingChunkSumAggregateInputType
    _min?: EmbeddingChunkMinAggregateInputType
    _max?: EmbeddingChunkMaxAggregateInputType
  }

  export type EmbeddingChunkGroupByOutputType = {
    id: number
    collectionId: number
    text: string
    _count: EmbeddingChunkCountAggregateOutputType | null
    _avg: EmbeddingChunkAvgAggregateOutputType | null
    _sum: EmbeddingChunkSumAggregateOutputType | null
    _min: EmbeddingChunkMinAggregateOutputType | null
    _max: EmbeddingChunkMaxAggregateOutputType | null
  }

  type GetEmbeddingChunkGroupByPayload<T extends EmbeddingChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbeddingChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbeddingChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbeddingChunkGroupByOutputType[P]>
            : GetScalarType<T[P], EmbeddingChunkGroupByOutputType[P]>
        }
      >
    >


  export type EmbeddingChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collectionId?: boolean
    text?: boolean
    collection?: boolean | PostmanCollectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embeddingChunk"]>


  export type EmbeddingChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    collectionId?: boolean
    text?: boolean
    collection?: boolean | PostmanCollectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embeddingChunk"]>

  export type EmbeddingChunkSelectScalar = {
    id?: boolean
    collectionId?: boolean
    text?: boolean
  }

  export type EmbeddingChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "collectionId" | "text", ExtArgs["result"]["embeddingChunk"]>
  export type EmbeddingChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collection?: boolean | PostmanCollectionDefaultArgs<ExtArgs>
  }
  export type EmbeddingChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collection?: boolean | PostmanCollectionDefaultArgs<ExtArgs>
  }

  export type $EmbeddingChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmbeddingChunk"
    objects: {
      collection: Prisma.$PostmanCollectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      collectionId: number
      text: string
    }, ExtArgs["result"]["embeddingChunk"]>
    composites: {}
  }

  type EmbeddingChunkGetPayload<S extends boolean | null | undefined | EmbeddingChunkDefaultArgs> = $Result.GetResult<Prisma.$EmbeddingChunkPayload, S>

  type EmbeddingChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbeddingChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbeddingChunkCountAggregateInputType | true
    }

  export interface EmbeddingChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmbeddingChunk'], meta: { name: 'EmbeddingChunk' } }
    /**
     * Find zero or one EmbeddingChunk that matches the filter.
     * @param {EmbeddingChunkFindUniqueArgs} args - Arguments to find a EmbeddingChunk
     * @example
     * // Get one EmbeddingChunk
     * const embeddingChunk = await prisma.embeddingChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbeddingChunkFindUniqueArgs>(args: SelectSubset<T, EmbeddingChunkFindUniqueArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmbeddingChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbeddingChunkFindUniqueOrThrowArgs} args - Arguments to find a EmbeddingChunk
     * @example
     * // Get one EmbeddingChunk
     * const embeddingChunk = await prisma.embeddingChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbeddingChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbeddingChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbeddingChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkFindFirstArgs} args - Arguments to find a EmbeddingChunk
     * @example
     * // Get one EmbeddingChunk
     * const embeddingChunk = await prisma.embeddingChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbeddingChunkFindFirstArgs>(args?: SelectSubset<T, EmbeddingChunkFindFirstArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbeddingChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkFindFirstOrThrowArgs} args - Arguments to find a EmbeddingChunk
     * @example
     * // Get one EmbeddingChunk
     * const embeddingChunk = await prisma.embeddingChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbeddingChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbeddingChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmbeddingChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmbeddingChunks
     * const embeddingChunks = await prisma.embeddingChunk.findMany()
     * 
     * // Get first 10 EmbeddingChunks
     * const embeddingChunks = await prisma.embeddingChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embeddingChunkWithIdOnly = await prisma.embeddingChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbeddingChunkFindManyArgs>(args?: SelectSubset<T, EmbeddingChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a EmbeddingChunk.
     * @param {EmbeddingChunkDeleteArgs} args - Arguments to delete one EmbeddingChunk.
     * @example
     * // Delete one EmbeddingChunk
     * const EmbeddingChunk = await prisma.embeddingChunk.delete({
     *   where: {
     *     // ... filter to delete one EmbeddingChunk
     *   }
     * })
     * 
     */
    delete<T extends EmbeddingChunkDeleteArgs>(args: SelectSubset<T, EmbeddingChunkDeleteArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmbeddingChunk.
     * @param {EmbeddingChunkUpdateArgs} args - Arguments to update one EmbeddingChunk.
     * @example
     * // Update one EmbeddingChunk
     * const embeddingChunk = await prisma.embeddingChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbeddingChunkUpdateArgs>(args: SelectSubset<T, EmbeddingChunkUpdateArgs<ExtArgs>>): Prisma__EmbeddingChunkClient<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmbeddingChunks.
     * @param {EmbeddingChunkDeleteManyArgs} args - Arguments to filter EmbeddingChunks to delete.
     * @example
     * // Delete a few EmbeddingChunks
     * const { count } = await prisma.embeddingChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbeddingChunkDeleteManyArgs>(args?: SelectSubset<T, EmbeddingChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbeddingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmbeddingChunks
     * const embeddingChunk = await prisma.embeddingChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbeddingChunkUpdateManyArgs>(args: SelectSubset<T, EmbeddingChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbeddingChunks and returns the data updated in the database.
     * @param {EmbeddingChunkUpdateManyAndReturnArgs} args - Arguments to update many EmbeddingChunks.
     * @example
     * // Update many EmbeddingChunks
     * const embeddingChunk = await prisma.embeddingChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmbeddingChunks and only return the `id`
     * const embeddingChunkWithIdOnly = await prisma.embeddingChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmbeddingChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, EmbeddingChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of EmbeddingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkCountArgs} args - Arguments to filter EmbeddingChunks to count.
     * @example
     * // Count the number of EmbeddingChunks
     * const count = await prisma.embeddingChunk.count({
     *   where: {
     *     // ... the filter for the EmbeddingChunks we want to count
     *   }
     * })
    **/
    count<T extends EmbeddingChunkCountArgs>(
      args?: Subset<T, EmbeddingChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbeddingChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmbeddingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbeddingChunkAggregateArgs>(args: Subset<T, EmbeddingChunkAggregateArgs>): Prisma.PrismaPromise<GetEmbeddingChunkAggregateType<T>>

    /**
     * Group by EmbeddingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmbeddingChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbeddingChunkGroupByArgs['orderBy'] }
        : { orderBy?: EmbeddingChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmbeddingChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbeddingChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmbeddingChunk model
   */
  readonly fields: EmbeddingChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmbeddingChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbeddingChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collection<T extends PostmanCollectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostmanCollectionDefaultArgs<ExtArgs>>): Prisma__PostmanCollectionClient<$Result.GetResult<Prisma.$PostmanCollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmbeddingChunk model
   */
  interface EmbeddingChunkFieldRefs {
    readonly id: FieldRef<"EmbeddingChunk", 'Int'>
    readonly collectionId: FieldRef<"EmbeddingChunk", 'Int'>
    readonly text: FieldRef<"EmbeddingChunk", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmbeddingChunk findUnique
   */
  export type EmbeddingChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter, which EmbeddingChunk to fetch.
     */
    where: EmbeddingChunkWhereUniqueInput
  }

  /**
   * EmbeddingChunk findUniqueOrThrow
   */
  export type EmbeddingChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter, which EmbeddingChunk to fetch.
     */
    where: EmbeddingChunkWhereUniqueInput
  }

  /**
   * EmbeddingChunk findFirst
   */
  export type EmbeddingChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter, which EmbeddingChunk to fetch.
     */
    where?: EmbeddingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingChunks to fetch.
     */
    orderBy?: EmbeddingChunkOrderByWithRelationInput | EmbeddingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbeddingChunks.
     */
    cursor?: EmbeddingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbeddingChunks.
     */
    distinct?: EmbeddingChunkScalarFieldEnum | EmbeddingChunkScalarFieldEnum[]
  }

  /**
   * EmbeddingChunk findFirstOrThrow
   */
  export type EmbeddingChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter, which EmbeddingChunk to fetch.
     */
    where?: EmbeddingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingChunks to fetch.
     */
    orderBy?: EmbeddingChunkOrderByWithRelationInput | EmbeddingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbeddingChunks.
     */
    cursor?: EmbeddingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbeddingChunks.
     */
    distinct?: EmbeddingChunkScalarFieldEnum | EmbeddingChunkScalarFieldEnum[]
  }

  /**
   * EmbeddingChunk findMany
   */
  export type EmbeddingChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter, which EmbeddingChunks to fetch.
     */
    where?: EmbeddingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingChunks to fetch.
     */
    orderBy?: EmbeddingChunkOrderByWithRelationInput | EmbeddingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmbeddingChunks.
     */
    cursor?: EmbeddingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingChunks.
     */
    skip?: number
    distinct?: EmbeddingChunkScalarFieldEnum | EmbeddingChunkScalarFieldEnum[]
  }

  /**
   * EmbeddingChunk update
   */
  export type EmbeddingChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a EmbeddingChunk.
     */
    data: XOR<EmbeddingChunkUpdateInput, EmbeddingChunkUncheckedUpdateInput>
    /**
     * Choose, which EmbeddingChunk to update.
     */
    where: EmbeddingChunkWhereUniqueInput
  }

  /**
   * EmbeddingChunk updateMany
   */
  export type EmbeddingChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmbeddingChunks.
     */
    data: XOR<EmbeddingChunkUpdateManyMutationInput, EmbeddingChunkUncheckedUpdateManyInput>
    /**
     * Filter which EmbeddingChunks to update
     */
    where?: EmbeddingChunkWhereInput
    /**
     * Limit how many EmbeddingChunks to update.
     */
    limit?: number
  }

  /**
   * EmbeddingChunk updateManyAndReturn
   */
  export type EmbeddingChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * The data used to update EmbeddingChunks.
     */
    data: XOR<EmbeddingChunkUpdateManyMutationInput, EmbeddingChunkUncheckedUpdateManyInput>
    /**
     * Filter which EmbeddingChunks to update
     */
    where?: EmbeddingChunkWhereInput
    /**
     * Limit how many EmbeddingChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmbeddingChunk delete
   */
  export type EmbeddingChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
    /**
     * Filter which EmbeddingChunk to delete.
     */
    where: EmbeddingChunkWhereUniqueInput
  }

  /**
   * EmbeddingChunk deleteMany
   */
  export type EmbeddingChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbeddingChunks to delete
     */
    where?: EmbeddingChunkWhereInput
    /**
     * Limit how many EmbeddingChunks to delete.
     */
    limit?: number
  }

  /**
   * EmbeddingChunk without action
   */
  export type EmbeddingChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingChunk
     */
    select?: EmbeddingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingChunk
     */
    omit?: EmbeddingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingChunkInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SettingCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type SettingMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type SettingCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    key: string
    value: string
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    key?: boolean
    value?: boolean
  }

  export type SettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value", ExtArgs["result"]["setting"]>

  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const settingWithKeyOnly = await prisma.setting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */
  interface SettingFieldRefs {
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting updateManyAndReturn
   */
  export type SettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
  }


  /**
   * Model Playbook
   */

  export type AggregatePlaybook = {
    _count: PlaybookCountAggregateOutputType | null
    _avg: PlaybookAvgAggregateOutputType | null
    _sum: PlaybookSumAggregateOutputType | null
    _min: PlaybookMinAggregateOutputType | null
    _max: PlaybookMaxAggregateOutputType | null
  }

  export type PlaybookAvgAggregateOutputType = {
    id: number | null
    erpId: number | null
  }

  export type PlaybookSumAggregateOutputType = {
    id: number | null
    erpId: number | null
  }

  export type PlaybookMinAggregateOutputType = {
    id: number | null
    erpId: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PlaybookMaxAggregateOutputType = {
    id: number | null
    erpId: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PlaybookCountAggregateOutputType = {
    id: number
    erpId: number
    name: number
    description: number
    createdAt: number
    _all: number
  }


  export type PlaybookAvgAggregateInputType = {
    id?: true
    erpId?: true
  }

  export type PlaybookSumAggregateInputType = {
    id?: true
    erpId?: true
  }

  export type PlaybookMinAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type PlaybookMaxAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type PlaybookCountAggregateInputType = {
    id?: true
    erpId?: true
    name?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PlaybookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playbook to aggregate.
     */
    where?: PlaybookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playbooks to fetch.
     */
    orderBy?: PlaybookOrderByWithRelationInput | PlaybookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaybookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playbooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playbooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Playbooks
    **/
    _count?: true | PlaybookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaybookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaybookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaybookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaybookMaxAggregateInputType
  }

  export type GetPlaybookAggregateType<T extends PlaybookAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaybook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaybook[P]>
      : GetScalarType<T[P], AggregatePlaybook[P]>
  }




  export type PlaybookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookWhereInput
    orderBy?: PlaybookOrderByWithAggregationInput | PlaybookOrderByWithAggregationInput[]
    by: PlaybookScalarFieldEnum[] | PlaybookScalarFieldEnum
    having?: PlaybookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaybookCountAggregateInputType | true
    _avg?: PlaybookAvgAggregateInputType
    _sum?: PlaybookSumAggregateInputType
    _min?: PlaybookMinAggregateInputType
    _max?: PlaybookMaxAggregateInputType
  }

  export type PlaybookGroupByOutputType = {
    id: number
    erpId: number
    name: string
    description: string
    createdAt: Date
    _count: PlaybookCountAggregateOutputType | null
    _avg: PlaybookAvgAggregateOutputType | null
    _sum: PlaybookSumAggregateOutputType | null
    _min: PlaybookMinAggregateOutputType | null
    _max: PlaybookMaxAggregateOutputType | null
  }

  type GetPlaybookGroupByPayload<T extends PlaybookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaybookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaybookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaybookGroupByOutputType[P]>
            : GetScalarType<T[P], PlaybookGroupByOutputType[P]>
        }
      >
    >


  export type PlaybookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    steps?: boolean | Playbook$stepsArgs<ExtArgs>
    runs?: boolean | Playbook$runsArgs<ExtArgs>
    _count?: boolean | PlaybookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbook"]>

  export type PlaybookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbook"]>

  export type PlaybookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbook"]>

  export type PlaybookSelectScalar = {
    id?: boolean
    erpId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PlaybookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpId" | "name" | "description" | "createdAt", ExtArgs["result"]["playbook"]>
  export type PlaybookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    steps?: boolean | Playbook$stepsArgs<ExtArgs>
    runs?: boolean | Playbook$runsArgs<ExtArgs>
    _count?: boolean | PlaybookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlaybookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }
  export type PlaybookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }

  export type $PlaybookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Playbook"
    objects: {
      erp: Prisma.$ERPPayload<ExtArgs>
      steps: Prisma.$PlaybookStepPayload<ExtArgs>[]
      runs: Prisma.$PlaybookRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      erpId: number
      name: string
      description: string
      createdAt: Date
    }, ExtArgs["result"]["playbook"]>
    composites: {}
  }

  type PlaybookGetPayload<S extends boolean | null | undefined | PlaybookDefaultArgs> = $Result.GetResult<Prisma.$PlaybookPayload, S>

  type PlaybookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaybookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaybookCountAggregateInputType | true
    }

  export interface PlaybookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Playbook'], meta: { name: 'Playbook' } }
    /**
     * Find zero or one Playbook that matches the filter.
     * @param {PlaybookFindUniqueArgs} args - Arguments to find a Playbook
     * @example
     * // Get one Playbook
     * const playbook = await prisma.playbook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaybookFindUniqueArgs>(args: SelectSubset<T, PlaybookFindUniqueArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playbook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaybookFindUniqueOrThrowArgs} args - Arguments to find a Playbook
     * @example
     * // Get one Playbook
     * const playbook = await prisma.playbook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaybookFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaybookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playbook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookFindFirstArgs} args - Arguments to find a Playbook
     * @example
     * // Get one Playbook
     * const playbook = await prisma.playbook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaybookFindFirstArgs>(args?: SelectSubset<T, PlaybookFindFirstArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playbook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookFindFirstOrThrowArgs} args - Arguments to find a Playbook
     * @example
     * // Get one Playbook
     * const playbook = await prisma.playbook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaybookFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaybookFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playbooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playbooks
     * const playbooks = await prisma.playbook.findMany()
     * 
     * // Get first 10 Playbooks
     * const playbooks = await prisma.playbook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playbookWithIdOnly = await prisma.playbook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaybookFindManyArgs>(args?: SelectSubset<T, PlaybookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playbook.
     * @param {PlaybookCreateArgs} args - Arguments to create a Playbook.
     * @example
     * // Create one Playbook
     * const Playbook = await prisma.playbook.create({
     *   data: {
     *     // ... data to create a Playbook
     *   }
     * })
     * 
     */
    create<T extends PlaybookCreateArgs>(args: SelectSubset<T, PlaybookCreateArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playbooks.
     * @param {PlaybookCreateManyArgs} args - Arguments to create many Playbooks.
     * @example
     * // Create many Playbooks
     * const playbook = await prisma.playbook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaybookCreateManyArgs>(args?: SelectSubset<T, PlaybookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playbooks and returns the data saved in the database.
     * @param {PlaybookCreateManyAndReturnArgs} args - Arguments to create many Playbooks.
     * @example
     * // Create many Playbooks
     * const playbook = await prisma.playbook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playbooks and only return the `id`
     * const playbookWithIdOnly = await prisma.playbook.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaybookCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaybookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Playbook.
     * @param {PlaybookDeleteArgs} args - Arguments to delete one Playbook.
     * @example
     * // Delete one Playbook
     * const Playbook = await prisma.playbook.delete({
     *   where: {
     *     // ... filter to delete one Playbook
     *   }
     * })
     * 
     */
    delete<T extends PlaybookDeleteArgs>(args: SelectSubset<T, PlaybookDeleteArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playbook.
     * @param {PlaybookUpdateArgs} args - Arguments to update one Playbook.
     * @example
     * // Update one Playbook
     * const playbook = await prisma.playbook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaybookUpdateArgs>(args: SelectSubset<T, PlaybookUpdateArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playbooks.
     * @param {PlaybookDeleteManyArgs} args - Arguments to filter Playbooks to delete.
     * @example
     * // Delete a few Playbooks
     * const { count } = await prisma.playbook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaybookDeleteManyArgs>(args?: SelectSubset<T, PlaybookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playbooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playbooks
     * const playbook = await prisma.playbook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaybookUpdateManyArgs>(args: SelectSubset<T, PlaybookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playbooks and returns the data updated in the database.
     * @param {PlaybookUpdateManyAndReturnArgs} args - Arguments to update many Playbooks.
     * @example
     * // Update many Playbooks
     * const playbook = await prisma.playbook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Playbooks and only return the `id`
     * const playbookWithIdOnly = await prisma.playbook.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaybookUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaybookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Playbook.
     * @param {PlaybookUpsertArgs} args - Arguments to update or create a Playbook.
     * @example
     * // Update or create a Playbook
     * const playbook = await prisma.playbook.upsert({
     *   create: {
     *     // ... data to create a Playbook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playbook we want to update
     *   }
     * })
     */
    upsert<T extends PlaybookUpsertArgs>(args: SelectSubset<T, PlaybookUpsertArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playbooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookCountArgs} args - Arguments to filter Playbooks to count.
     * @example
     * // Count the number of Playbooks
     * const count = await prisma.playbook.count({
     *   where: {
     *     // ... the filter for the Playbooks we want to count
     *   }
     * })
    **/
    count<T extends PlaybookCountArgs>(
      args?: Subset<T, PlaybookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaybookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playbook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaybookAggregateArgs>(args: Subset<T, PlaybookAggregateArgs>): Prisma.PrismaPromise<GetPlaybookAggregateType<T>>

    /**
     * Group by Playbook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaybookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaybookGroupByArgs['orderBy'] }
        : { orderBy?: PlaybookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaybookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaybookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Playbook model
   */
  readonly fields: PlaybookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Playbook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaybookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    erp<T extends ERPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ERPDefaultArgs<ExtArgs>>): Prisma__ERPClient<$Result.GetResult<Prisma.$ERPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    steps<T extends Playbook$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Playbook$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    runs<T extends Playbook$runsArgs<ExtArgs> = {}>(args?: Subset<T, Playbook$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Playbook model
   */
  interface PlaybookFieldRefs {
    readonly id: FieldRef<"Playbook", 'Int'>
    readonly erpId: FieldRef<"Playbook", 'Int'>
    readonly name: FieldRef<"Playbook", 'String'>
    readonly description: FieldRef<"Playbook", 'String'>
    readonly createdAt: FieldRef<"Playbook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Playbook findUnique
   */
  export type PlaybookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter, which Playbook to fetch.
     */
    where: PlaybookWhereUniqueInput
  }

  /**
   * Playbook findUniqueOrThrow
   */
  export type PlaybookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter, which Playbook to fetch.
     */
    where: PlaybookWhereUniqueInput
  }

  /**
   * Playbook findFirst
   */
  export type PlaybookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter, which Playbook to fetch.
     */
    where?: PlaybookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playbooks to fetch.
     */
    orderBy?: PlaybookOrderByWithRelationInput | PlaybookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playbooks.
     */
    cursor?: PlaybookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playbooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playbooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playbooks.
     */
    distinct?: PlaybookScalarFieldEnum | PlaybookScalarFieldEnum[]
  }

  /**
   * Playbook findFirstOrThrow
   */
  export type PlaybookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter, which Playbook to fetch.
     */
    where?: PlaybookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playbooks to fetch.
     */
    orderBy?: PlaybookOrderByWithRelationInput | PlaybookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playbooks.
     */
    cursor?: PlaybookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playbooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playbooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playbooks.
     */
    distinct?: PlaybookScalarFieldEnum | PlaybookScalarFieldEnum[]
  }

  /**
   * Playbook findMany
   */
  export type PlaybookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter, which Playbooks to fetch.
     */
    where?: PlaybookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playbooks to fetch.
     */
    orderBy?: PlaybookOrderByWithRelationInput | PlaybookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Playbooks.
     */
    cursor?: PlaybookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playbooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playbooks.
     */
    skip?: number
    distinct?: PlaybookScalarFieldEnum | PlaybookScalarFieldEnum[]
  }

  /**
   * Playbook create
   */
  export type PlaybookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * The data needed to create a Playbook.
     */
    data: XOR<PlaybookCreateInput, PlaybookUncheckedCreateInput>
  }

  /**
   * Playbook createMany
   */
  export type PlaybookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Playbooks.
     */
    data: PlaybookCreateManyInput | PlaybookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playbook createManyAndReturn
   */
  export type PlaybookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * The data used to create many Playbooks.
     */
    data: PlaybookCreateManyInput | PlaybookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playbook update
   */
  export type PlaybookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * The data needed to update a Playbook.
     */
    data: XOR<PlaybookUpdateInput, PlaybookUncheckedUpdateInput>
    /**
     * Choose, which Playbook to update.
     */
    where: PlaybookWhereUniqueInput
  }

  /**
   * Playbook updateMany
   */
  export type PlaybookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Playbooks.
     */
    data: XOR<PlaybookUpdateManyMutationInput, PlaybookUncheckedUpdateManyInput>
    /**
     * Filter which Playbooks to update
     */
    where?: PlaybookWhereInput
    /**
     * Limit how many Playbooks to update.
     */
    limit?: number
  }

  /**
   * Playbook updateManyAndReturn
   */
  export type PlaybookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * The data used to update Playbooks.
     */
    data: XOR<PlaybookUpdateManyMutationInput, PlaybookUncheckedUpdateManyInput>
    /**
     * Filter which Playbooks to update
     */
    where?: PlaybookWhereInput
    /**
     * Limit how many Playbooks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playbook upsert
   */
  export type PlaybookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * The filter to search for the Playbook to update in case it exists.
     */
    where: PlaybookWhereUniqueInput
    /**
     * In case the Playbook found by the `where` argument doesn't exist, create a new Playbook with this data.
     */
    create: XOR<PlaybookCreateInput, PlaybookUncheckedCreateInput>
    /**
     * In case the Playbook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaybookUpdateInput, PlaybookUncheckedUpdateInput>
  }

  /**
   * Playbook delete
   */
  export type PlaybookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
    /**
     * Filter which Playbook to delete.
     */
    where: PlaybookWhereUniqueInput
  }

  /**
   * Playbook deleteMany
   */
  export type PlaybookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playbooks to delete
     */
    where?: PlaybookWhereInput
    /**
     * Limit how many Playbooks to delete.
     */
    limit?: number
  }

  /**
   * Playbook.steps
   */
  export type Playbook$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    where?: PlaybookStepWhereInput
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    cursor?: PlaybookStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybookStepScalarFieldEnum | PlaybookStepScalarFieldEnum[]
  }

  /**
   * Playbook.runs
   */
  export type Playbook$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    where?: PlaybookRunWhereInput
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    cursor?: PlaybookRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybookRunScalarFieldEnum | PlaybookRunScalarFieldEnum[]
  }

  /**
   * Playbook without action
   */
  export type PlaybookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playbook
     */
    select?: PlaybookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playbook
     */
    omit?: PlaybookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookInclude<ExtArgs> | null
  }


  /**
   * Model PlaybookStep
   */

  export type AggregatePlaybookStep = {
    _count: PlaybookStepCountAggregateOutputType | null
    _avg: PlaybookStepAvgAggregateOutputType | null
    _sum: PlaybookStepSumAggregateOutputType | null
    _min: PlaybookStepMinAggregateOutputType | null
    _max: PlaybookStepMaxAggregateOutputType | null
  }

  export type PlaybookStepAvgAggregateOutputType = {
    id: number | null
    playbookId: number | null
    order: number | null
    endpointId: number | null
  }

  export type PlaybookStepSumAggregateOutputType = {
    id: number | null
    playbookId: number | null
    order: number | null
    endpointId: number | null
  }

  export type PlaybookStepMinAggregateOutputType = {
    id: number | null
    playbookId: number | null
    order: number | null
    endpointId: number | null
    stepName: string | null
    bodyOverride: string | null
    responseCapture: string | null
  }

  export type PlaybookStepMaxAggregateOutputType = {
    id: number | null
    playbookId: number | null
    order: number | null
    endpointId: number | null
    stepName: string | null
    bodyOverride: string | null
    responseCapture: string | null
  }

  export type PlaybookStepCountAggregateOutputType = {
    id: number
    playbookId: number
    order: number
    endpointId: number
    stepName: number
    bodyOverride: number
    responseCapture: number
    _all: number
  }


  export type PlaybookStepAvgAggregateInputType = {
    id?: true
    playbookId?: true
    order?: true
    endpointId?: true
  }

  export type PlaybookStepSumAggregateInputType = {
    id?: true
    playbookId?: true
    order?: true
    endpointId?: true
  }

  export type PlaybookStepMinAggregateInputType = {
    id?: true
    playbookId?: true
    order?: true
    endpointId?: true
    stepName?: true
    bodyOverride?: true
    responseCapture?: true
  }

  export type PlaybookStepMaxAggregateInputType = {
    id?: true
    playbookId?: true
    order?: true
    endpointId?: true
    stepName?: true
    bodyOverride?: true
    responseCapture?: true
  }

  export type PlaybookStepCountAggregateInputType = {
    id?: true
    playbookId?: true
    order?: true
    endpointId?: true
    stepName?: true
    bodyOverride?: true
    responseCapture?: true
    _all?: true
  }

  export type PlaybookStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybookStep to aggregate.
     */
    where?: PlaybookStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookSteps to fetch.
     */
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaybookStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaybookSteps
    **/
    _count?: true | PlaybookStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaybookStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaybookStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaybookStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaybookStepMaxAggregateInputType
  }

  export type GetPlaybookStepAggregateType<T extends PlaybookStepAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaybookStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaybookStep[P]>
      : GetScalarType<T[P], AggregatePlaybookStep[P]>
  }




  export type PlaybookStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookStepWhereInput
    orderBy?: PlaybookStepOrderByWithAggregationInput | PlaybookStepOrderByWithAggregationInput[]
    by: PlaybookStepScalarFieldEnum[] | PlaybookStepScalarFieldEnum
    having?: PlaybookStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaybookStepCountAggregateInputType | true
    _avg?: PlaybookStepAvgAggregateInputType
    _sum?: PlaybookStepSumAggregateInputType
    _min?: PlaybookStepMinAggregateInputType
    _max?: PlaybookStepMaxAggregateInputType
  }

  export type PlaybookStepGroupByOutputType = {
    id: number
    playbookId: number
    order: number
    endpointId: number
    stepName: string
    bodyOverride: string
    responseCapture: string
    _count: PlaybookStepCountAggregateOutputType | null
    _avg: PlaybookStepAvgAggregateOutputType | null
    _sum: PlaybookStepSumAggregateOutputType | null
    _min: PlaybookStepMinAggregateOutputType | null
    _max: PlaybookStepMaxAggregateOutputType | null
  }

  type GetPlaybookStepGroupByPayload<T extends PlaybookStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaybookStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaybookStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaybookStepGroupByOutputType[P]>
            : GetScalarType<T[P], PlaybookStepGroupByOutputType[P]>
        }
      >
    >


  export type PlaybookStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    order?: boolean
    endpointId?: boolean
    stepName?: boolean
    bodyOverride?: boolean
    responseCapture?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookStep"]>

  export type PlaybookStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    order?: boolean
    endpointId?: boolean
    stepName?: boolean
    bodyOverride?: boolean
    responseCapture?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookStep"]>

  export type PlaybookStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    order?: boolean
    endpointId?: boolean
    stepName?: boolean
    bodyOverride?: boolean
    responseCapture?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookStep"]>

  export type PlaybookStepSelectScalar = {
    id?: boolean
    playbookId?: boolean
    order?: boolean
    endpointId?: boolean
    stepName?: boolean
    bodyOverride?: boolean
    responseCapture?: boolean
  }

  export type PlaybookStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playbookId" | "order" | "endpointId" | "stepName" | "bodyOverride" | "responseCapture", ExtArgs["result"]["playbookStep"]>
  export type PlaybookStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }
  export type PlaybookStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }
  export type PlaybookStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
  }

  export type $PlaybookStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaybookStep"
    objects: {
      playbook: Prisma.$PlaybookPayload<ExtArgs>
      endpoint: Prisma.$EndpointPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      playbookId: number
      order: number
      endpointId: number
      stepName: string
      bodyOverride: string
      responseCapture: string
    }, ExtArgs["result"]["playbookStep"]>
    composites: {}
  }

  type PlaybookStepGetPayload<S extends boolean | null | undefined | PlaybookStepDefaultArgs> = $Result.GetResult<Prisma.$PlaybookStepPayload, S>

  type PlaybookStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaybookStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaybookStepCountAggregateInputType | true
    }

  export interface PlaybookStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaybookStep'], meta: { name: 'PlaybookStep' } }
    /**
     * Find zero or one PlaybookStep that matches the filter.
     * @param {PlaybookStepFindUniqueArgs} args - Arguments to find a PlaybookStep
     * @example
     * // Get one PlaybookStep
     * const playbookStep = await prisma.playbookStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaybookStepFindUniqueArgs>(args: SelectSubset<T, PlaybookStepFindUniqueArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlaybookStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaybookStepFindUniqueOrThrowArgs} args - Arguments to find a PlaybookStep
     * @example
     * // Get one PlaybookStep
     * const playbookStep = await prisma.playbookStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaybookStepFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaybookStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybookStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepFindFirstArgs} args - Arguments to find a PlaybookStep
     * @example
     * // Get one PlaybookStep
     * const playbookStep = await prisma.playbookStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaybookStepFindFirstArgs>(args?: SelectSubset<T, PlaybookStepFindFirstArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybookStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepFindFirstOrThrowArgs} args - Arguments to find a PlaybookStep
     * @example
     * // Get one PlaybookStep
     * const playbookStep = await prisma.playbookStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaybookStepFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaybookStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlaybookSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaybookSteps
     * const playbookSteps = await prisma.playbookStep.findMany()
     * 
     * // Get first 10 PlaybookSteps
     * const playbookSteps = await prisma.playbookStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playbookStepWithIdOnly = await prisma.playbookStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaybookStepFindManyArgs>(args?: SelectSubset<T, PlaybookStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlaybookStep.
     * @param {PlaybookStepCreateArgs} args - Arguments to create a PlaybookStep.
     * @example
     * // Create one PlaybookStep
     * const PlaybookStep = await prisma.playbookStep.create({
     *   data: {
     *     // ... data to create a PlaybookStep
     *   }
     * })
     * 
     */
    create<T extends PlaybookStepCreateArgs>(args: SelectSubset<T, PlaybookStepCreateArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlaybookSteps.
     * @param {PlaybookStepCreateManyArgs} args - Arguments to create many PlaybookSteps.
     * @example
     * // Create many PlaybookSteps
     * const playbookStep = await prisma.playbookStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaybookStepCreateManyArgs>(args?: SelectSubset<T, PlaybookStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlaybookSteps and returns the data saved in the database.
     * @param {PlaybookStepCreateManyAndReturnArgs} args - Arguments to create many PlaybookSteps.
     * @example
     * // Create many PlaybookSteps
     * const playbookStep = await prisma.playbookStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlaybookSteps and only return the `id`
     * const playbookStepWithIdOnly = await prisma.playbookStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaybookStepCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaybookStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlaybookStep.
     * @param {PlaybookStepDeleteArgs} args - Arguments to delete one PlaybookStep.
     * @example
     * // Delete one PlaybookStep
     * const PlaybookStep = await prisma.playbookStep.delete({
     *   where: {
     *     // ... filter to delete one PlaybookStep
     *   }
     * })
     * 
     */
    delete<T extends PlaybookStepDeleteArgs>(args: SelectSubset<T, PlaybookStepDeleteArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlaybookStep.
     * @param {PlaybookStepUpdateArgs} args - Arguments to update one PlaybookStep.
     * @example
     * // Update one PlaybookStep
     * const playbookStep = await prisma.playbookStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaybookStepUpdateArgs>(args: SelectSubset<T, PlaybookStepUpdateArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlaybookSteps.
     * @param {PlaybookStepDeleteManyArgs} args - Arguments to filter PlaybookSteps to delete.
     * @example
     * // Delete a few PlaybookSteps
     * const { count } = await prisma.playbookStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaybookStepDeleteManyArgs>(args?: SelectSubset<T, PlaybookStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybookSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaybookSteps
     * const playbookStep = await prisma.playbookStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaybookStepUpdateManyArgs>(args: SelectSubset<T, PlaybookStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybookSteps and returns the data updated in the database.
     * @param {PlaybookStepUpdateManyAndReturnArgs} args - Arguments to update many PlaybookSteps.
     * @example
     * // Update many PlaybookSteps
     * const playbookStep = await prisma.playbookStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlaybookSteps and only return the `id`
     * const playbookStepWithIdOnly = await prisma.playbookStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaybookStepUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaybookStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlaybookStep.
     * @param {PlaybookStepUpsertArgs} args - Arguments to update or create a PlaybookStep.
     * @example
     * // Update or create a PlaybookStep
     * const playbookStep = await prisma.playbookStep.upsert({
     *   create: {
     *     // ... data to create a PlaybookStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaybookStep we want to update
     *   }
     * })
     */
    upsert<T extends PlaybookStepUpsertArgs>(args: SelectSubset<T, PlaybookStepUpsertArgs<ExtArgs>>): Prisma__PlaybookStepClient<$Result.GetResult<Prisma.$PlaybookStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlaybookSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepCountArgs} args - Arguments to filter PlaybookSteps to count.
     * @example
     * // Count the number of PlaybookSteps
     * const count = await prisma.playbookStep.count({
     *   where: {
     *     // ... the filter for the PlaybookSteps we want to count
     *   }
     * })
    **/
    count<T extends PlaybookStepCountArgs>(
      args?: Subset<T, PlaybookStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaybookStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaybookStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaybookStepAggregateArgs>(args: Subset<T, PlaybookStepAggregateArgs>): Prisma.PrismaPromise<GetPlaybookStepAggregateType<T>>

    /**
     * Group by PlaybookStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaybookStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaybookStepGroupByArgs['orderBy'] }
        : { orderBy?: PlaybookStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaybookStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaybookStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaybookStep model
   */
  readonly fields: PlaybookStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaybookStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaybookStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playbook<T extends PlaybookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaybookDefaultArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    endpoint<T extends EndpointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EndpointDefaultArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlaybookStep model
   */
  interface PlaybookStepFieldRefs {
    readonly id: FieldRef<"PlaybookStep", 'Int'>
    readonly playbookId: FieldRef<"PlaybookStep", 'Int'>
    readonly order: FieldRef<"PlaybookStep", 'Int'>
    readonly endpointId: FieldRef<"PlaybookStep", 'Int'>
    readonly stepName: FieldRef<"PlaybookStep", 'String'>
    readonly bodyOverride: FieldRef<"PlaybookStep", 'String'>
    readonly responseCapture: FieldRef<"PlaybookStep", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlaybookStep findUnique
   */
  export type PlaybookStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookStep to fetch.
     */
    where: PlaybookStepWhereUniqueInput
  }

  /**
   * PlaybookStep findUniqueOrThrow
   */
  export type PlaybookStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookStep to fetch.
     */
    where: PlaybookStepWhereUniqueInput
  }

  /**
   * PlaybookStep findFirst
   */
  export type PlaybookStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookStep to fetch.
     */
    where?: PlaybookStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookSteps to fetch.
     */
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybookSteps.
     */
    cursor?: PlaybookStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybookSteps.
     */
    distinct?: PlaybookStepScalarFieldEnum | PlaybookStepScalarFieldEnum[]
  }

  /**
   * PlaybookStep findFirstOrThrow
   */
  export type PlaybookStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookStep to fetch.
     */
    where?: PlaybookStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookSteps to fetch.
     */
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybookSteps.
     */
    cursor?: PlaybookStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybookSteps.
     */
    distinct?: PlaybookStepScalarFieldEnum | PlaybookStepScalarFieldEnum[]
  }

  /**
   * PlaybookStep findMany
   */
  export type PlaybookStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookSteps to fetch.
     */
    where?: PlaybookStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookSteps to fetch.
     */
    orderBy?: PlaybookStepOrderByWithRelationInput | PlaybookStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaybookSteps.
     */
    cursor?: PlaybookStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookSteps.
     */
    skip?: number
    distinct?: PlaybookStepScalarFieldEnum | PlaybookStepScalarFieldEnum[]
  }

  /**
   * PlaybookStep create
   */
  export type PlaybookStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * The data needed to create a PlaybookStep.
     */
    data: XOR<PlaybookStepCreateInput, PlaybookStepUncheckedCreateInput>
  }

  /**
   * PlaybookStep createMany
   */
  export type PlaybookStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaybookSteps.
     */
    data: PlaybookStepCreateManyInput | PlaybookStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaybookStep createManyAndReturn
   */
  export type PlaybookStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * The data used to create many PlaybookSteps.
     */
    data: PlaybookStepCreateManyInput | PlaybookStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybookStep update
   */
  export type PlaybookStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * The data needed to update a PlaybookStep.
     */
    data: XOR<PlaybookStepUpdateInput, PlaybookStepUncheckedUpdateInput>
    /**
     * Choose, which PlaybookStep to update.
     */
    where: PlaybookStepWhereUniqueInput
  }

  /**
   * PlaybookStep updateMany
   */
  export type PlaybookStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaybookSteps.
     */
    data: XOR<PlaybookStepUpdateManyMutationInput, PlaybookStepUncheckedUpdateManyInput>
    /**
     * Filter which PlaybookSteps to update
     */
    where?: PlaybookStepWhereInput
    /**
     * Limit how many PlaybookSteps to update.
     */
    limit?: number
  }

  /**
   * PlaybookStep updateManyAndReturn
   */
  export type PlaybookStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * The data used to update PlaybookSteps.
     */
    data: XOR<PlaybookStepUpdateManyMutationInput, PlaybookStepUncheckedUpdateManyInput>
    /**
     * Filter which PlaybookSteps to update
     */
    where?: PlaybookStepWhereInput
    /**
     * Limit how many PlaybookSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybookStep upsert
   */
  export type PlaybookStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * The filter to search for the PlaybookStep to update in case it exists.
     */
    where: PlaybookStepWhereUniqueInput
    /**
     * In case the PlaybookStep found by the `where` argument doesn't exist, create a new PlaybookStep with this data.
     */
    create: XOR<PlaybookStepCreateInput, PlaybookStepUncheckedCreateInput>
    /**
     * In case the PlaybookStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaybookStepUpdateInput, PlaybookStepUncheckedUpdateInput>
  }

  /**
   * PlaybookStep delete
   */
  export type PlaybookStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
    /**
     * Filter which PlaybookStep to delete.
     */
    where: PlaybookStepWhereUniqueInput
  }

  /**
   * PlaybookStep deleteMany
   */
  export type PlaybookStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybookSteps to delete
     */
    where?: PlaybookStepWhereInput
    /**
     * Limit how many PlaybookSteps to delete.
     */
    limit?: number
  }

  /**
   * PlaybookStep without action
   */
  export type PlaybookStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookStep
     */
    select?: PlaybookStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookStep
     */
    omit?: PlaybookStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookStepInclude<ExtArgs> | null
  }


  /**
   * Model PlaybookRun
   */

  export type AggregatePlaybookRun = {
    _count: PlaybookRunCountAggregateOutputType | null
    _avg: PlaybookRunAvgAggregateOutputType | null
    _sum: PlaybookRunSumAggregateOutputType | null
    _min: PlaybookRunMinAggregateOutputType | null
    _max: PlaybookRunMaxAggregateOutputType | null
  }

  export type PlaybookRunAvgAggregateOutputType = {
    id: number | null
    playbookId: number | null
    companyId: number | null
    clientId: number | null
  }

  export type PlaybookRunSumAggregateOutputType = {
    id: number | null
    playbookId: number | null
    companyId: number | null
    clientId: number | null
  }

  export type PlaybookRunMinAggregateOutputType = {
    id: number | null
    playbookId: number | null
    companyId: number | null
    clientId: number | null
    startedAt: Date | null
    endedAt: Date | null
    status: string | null
    shareToken: string | null
  }

  export type PlaybookRunMaxAggregateOutputType = {
    id: number | null
    playbookId: number | null
    companyId: number | null
    clientId: number | null
    startedAt: Date | null
    endedAt: Date | null
    status: string | null
    shareToken: string | null
  }

  export type PlaybookRunCountAggregateOutputType = {
    id: number
    playbookId: number
    companyId: number
    clientId: number
    startedAt: number
    endedAt: number
    status: number
    steps: number
    shareToken: number
    _all: number
  }


  export type PlaybookRunAvgAggregateInputType = {
    id?: true
    playbookId?: true
    companyId?: true
    clientId?: true
  }

  export type PlaybookRunSumAggregateInputType = {
    id?: true
    playbookId?: true
    companyId?: true
    clientId?: true
  }

  export type PlaybookRunMinAggregateInputType = {
    id?: true
    playbookId?: true
    companyId?: true
    clientId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    shareToken?: true
  }

  export type PlaybookRunMaxAggregateInputType = {
    id?: true
    playbookId?: true
    companyId?: true
    clientId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    shareToken?: true
  }

  export type PlaybookRunCountAggregateInputType = {
    id?: true
    playbookId?: true
    companyId?: true
    clientId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    steps?: true
    shareToken?: true
    _all?: true
  }

  export type PlaybookRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybookRun to aggregate.
     */
    where?: PlaybookRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookRuns to fetch.
     */
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaybookRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaybookRuns
    **/
    _count?: true | PlaybookRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaybookRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaybookRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaybookRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaybookRunMaxAggregateInputType
  }

  export type GetPlaybookRunAggregateType<T extends PlaybookRunAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaybookRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaybookRun[P]>
      : GetScalarType<T[P], AggregatePlaybookRun[P]>
  }




  export type PlaybookRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybookRunWhereInput
    orderBy?: PlaybookRunOrderByWithAggregationInput | PlaybookRunOrderByWithAggregationInput[]
    by: PlaybookRunScalarFieldEnum[] | PlaybookRunScalarFieldEnum
    having?: PlaybookRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaybookRunCountAggregateInputType | true
    _avg?: PlaybookRunAvgAggregateInputType
    _sum?: PlaybookRunSumAggregateInputType
    _min?: PlaybookRunMinAggregateInputType
    _max?: PlaybookRunMaxAggregateInputType
  }

  export type PlaybookRunGroupByOutputType = {
    id: number
    playbookId: number
    companyId: number
    clientId: number | null
    startedAt: Date
    endedAt: Date | null
    status: string
    steps: JsonValue
    shareToken: string | null
    _count: PlaybookRunCountAggregateOutputType | null
    _avg: PlaybookRunAvgAggregateOutputType | null
    _sum: PlaybookRunSumAggregateOutputType | null
    _min: PlaybookRunMinAggregateOutputType | null
    _max: PlaybookRunMaxAggregateOutputType | null
  }

  type GetPlaybookRunGroupByPayload<T extends PlaybookRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaybookRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaybookRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaybookRunGroupByOutputType[P]>
            : GetScalarType<T[P], PlaybookRunGroupByOutputType[P]>
        }
      >
    >


  export type PlaybookRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    companyId?: boolean
    clientId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    steps?: boolean
    shareToken?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookRun"]>

  export type PlaybookRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    companyId?: boolean
    clientId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    steps?: boolean
    shareToken?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookRun"]>

  export type PlaybookRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playbookId?: boolean
    companyId?: boolean
    clientId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    steps?: boolean
    shareToken?: boolean
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbookRun"]>

  export type PlaybookRunSelectScalar = {
    id?: boolean
    playbookId?: boolean
    companyId?: boolean
    clientId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    steps?: boolean
    shareToken?: boolean
  }

  export type PlaybookRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playbookId" | "companyId" | "clientId" | "startedAt" | "endedAt" | "status" | "steps" | "shareToken", ExtArgs["result"]["playbookRun"]>
  export type PlaybookRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type PlaybookRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type PlaybookRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playbook?: boolean | PlaybookDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $PlaybookRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaybookRun"
    objects: {
      playbook: Prisma.$PlaybookPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      playbookId: number
      companyId: number
      clientId: number | null
      startedAt: Date
      endedAt: Date | null
      status: string
      steps: Prisma.JsonValue
      shareToken: string | null
    }, ExtArgs["result"]["playbookRun"]>
    composites: {}
  }

  type PlaybookRunGetPayload<S extends boolean | null | undefined | PlaybookRunDefaultArgs> = $Result.GetResult<Prisma.$PlaybookRunPayload, S>

  type PlaybookRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaybookRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaybookRunCountAggregateInputType | true
    }

  export interface PlaybookRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaybookRun'], meta: { name: 'PlaybookRun' } }
    /**
     * Find zero or one PlaybookRun that matches the filter.
     * @param {PlaybookRunFindUniqueArgs} args - Arguments to find a PlaybookRun
     * @example
     * // Get one PlaybookRun
     * const playbookRun = await prisma.playbookRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaybookRunFindUniqueArgs>(args: SelectSubset<T, PlaybookRunFindUniqueArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlaybookRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaybookRunFindUniqueOrThrowArgs} args - Arguments to find a PlaybookRun
     * @example
     * // Get one PlaybookRun
     * const playbookRun = await prisma.playbookRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaybookRunFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaybookRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybookRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunFindFirstArgs} args - Arguments to find a PlaybookRun
     * @example
     * // Get one PlaybookRun
     * const playbookRun = await prisma.playbookRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaybookRunFindFirstArgs>(args?: SelectSubset<T, PlaybookRunFindFirstArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybookRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunFindFirstOrThrowArgs} args - Arguments to find a PlaybookRun
     * @example
     * // Get one PlaybookRun
     * const playbookRun = await prisma.playbookRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaybookRunFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaybookRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlaybookRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaybookRuns
     * const playbookRuns = await prisma.playbookRun.findMany()
     * 
     * // Get first 10 PlaybookRuns
     * const playbookRuns = await prisma.playbookRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playbookRunWithIdOnly = await prisma.playbookRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaybookRunFindManyArgs>(args?: SelectSubset<T, PlaybookRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlaybookRun.
     * @param {PlaybookRunCreateArgs} args - Arguments to create a PlaybookRun.
     * @example
     * // Create one PlaybookRun
     * const PlaybookRun = await prisma.playbookRun.create({
     *   data: {
     *     // ... data to create a PlaybookRun
     *   }
     * })
     * 
     */
    create<T extends PlaybookRunCreateArgs>(args: SelectSubset<T, PlaybookRunCreateArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlaybookRuns.
     * @param {PlaybookRunCreateManyArgs} args - Arguments to create many PlaybookRuns.
     * @example
     * // Create many PlaybookRuns
     * const playbookRun = await prisma.playbookRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaybookRunCreateManyArgs>(args?: SelectSubset<T, PlaybookRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlaybookRuns and returns the data saved in the database.
     * @param {PlaybookRunCreateManyAndReturnArgs} args - Arguments to create many PlaybookRuns.
     * @example
     * // Create many PlaybookRuns
     * const playbookRun = await prisma.playbookRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlaybookRuns and only return the `id`
     * const playbookRunWithIdOnly = await prisma.playbookRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaybookRunCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaybookRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlaybookRun.
     * @param {PlaybookRunDeleteArgs} args - Arguments to delete one PlaybookRun.
     * @example
     * // Delete one PlaybookRun
     * const PlaybookRun = await prisma.playbookRun.delete({
     *   where: {
     *     // ... filter to delete one PlaybookRun
     *   }
     * })
     * 
     */
    delete<T extends PlaybookRunDeleteArgs>(args: SelectSubset<T, PlaybookRunDeleteArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlaybookRun.
     * @param {PlaybookRunUpdateArgs} args - Arguments to update one PlaybookRun.
     * @example
     * // Update one PlaybookRun
     * const playbookRun = await prisma.playbookRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaybookRunUpdateArgs>(args: SelectSubset<T, PlaybookRunUpdateArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlaybookRuns.
     * @param {PlaybookRunDeleteManyArgs} args - Arguments to filter PlaybookRuns to delete.
     * @example
     * // Delete a few PlaybookRuns
     * const { count } = await prisma.playbookRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaybookRunDeleteManyArgs>(args?: SelectSubset<T, PlaybookRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybookRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaybookRuns
     * const playbookRun = await prisma.playbookRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaybookRunUpdateManyArgs>(args: SelectSubset<T, PlaybookRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybookRuns and returns the data updated in the database.
     * @param {PlaybookRunUpdateManyAndReturnArgs} args - Arguments to update many PlaybookRuns.
     * @example
     * // Update many PlaybookRuns
     * const playbookRun = await prisma.playbookRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlaybookRuns and only return the `id`
     * const playbookRunWithIdOnly = await prisma.playbookRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaybookRunUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaybookRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlaybookRun.
     * @param {PlaybookRunUpsertArgs} args - Arguments to update or create a PlaybookRun.
     * @example
     * // Update or create a PlaybookRun
     * const playbookRun = await prisma.playbookRun.upsert({
     *   create: {
     *     // ... data to create a PlaybookRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaybookRun we want to update
     *   }
     * })
     */
    upsert<T extends PlaybookRunUpsertArgs>(args: SelectSubset<T, PlaybookRunUpsertArgs<ExtArgs>>): Prisma__PlaybookRunClient<$Result.GetResult<Prisma.$PlaybookRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlaybookRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunCountArgs} args - Arguments to filter PlaybookRuns to count.
     * @example
     * // Count the number of PlaybookRuns
     * const count = await prisma.playbookRun.count({
     *   where: {
     *     // ... the filter for the PlaybookRuns we want to count
     *   }
     * })
    **/
    count<T extends PlaybookRunCountArgs>(
      args?: Subset<T, PlaybookRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaybookRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaybookRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaybookRunAggregateArgs>(args: Subset<T, PlaybookRunAggregateArgs>): Prisma.PrismaPromise<GetPlaybookRunAggregateType<T>>

    /**
     * Group by PlaybookRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybookRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaybookRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaybookRunGroupByArgs['orderBy'] }
        : { orderBy?: PlaybookRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaybookRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaybookRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaybookRun model
   */
  readonly fields: PlaybookRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaybookRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaybookRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playbook<T extends PlaybookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaybookDefaultArgs<ExtArgs>>): Prisma__PlaybookClient<$Result.GetResult<Prisma.$PlaybookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlaybookRun model
   */
  interface PlaybookRunFieldRefs {
    readonly id: FieldRef<"PlaybookRun", 'Int'>
    readonly playbookId: FieldRef<"PlaybookRun", 'Int'>
    readonly companyId: FieldRef<"PlaybookRun", 'Int'>
    readonly clientId: FieldRef<"PlaybookRun", 'Int'>
    readonly startedAt: FieldRef<"PlaybookRun", 'DateTime'>
    readonly endedAt: FieldRef<"PlaybookRun", 'DateTime'>
    readonly status: FieldRef<"PlaybookRun", 'String'>
    readonly steps: FieldRef<"PlaybookRun", 'Json'>
    readonly shareToken: FieldRef<"PlaybookRun", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlaybookRun findUnique
   */
  export type PlaybookRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookRun to fetch.
     */
    where: PlaybookRunWhereUniqueInput
  }

  /**
   * PlaybookRun findUniqueOrThrow
   */
  export type PlaybookRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookRun to fetch.
     */
    where: PlaybookRunWhereUniqueInput
  }

  /**
   * PlaybookRun findFirst
   */
  export type PlaybookRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookRun to fetch.
     */
    where?: PlaybookRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookRuns to fetch.
     */
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybookRuns.
     */
    cursor?: PlaybookRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybookRuns.
     */
    distinct?: PlaybookRunScalarFieldEnum | PlaybookRunScalarFieldEnum[]
  }

  /**
   * PlaybookRun findFirstOrThrow
   */
  export type PlaybookRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookRun to fetch.
     */
    where?: PlaybookRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookRuns to fetch.
     */
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybookRuns.
     */
    cursor?: PlaybookRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybookRuns.
     */
    distinct?: PlaybookRunScalarFieldEnum | PlaybookRunScalarFieldEnum[]
  }

  /**
   * PlaybookRun findMany
   */
  export type PlaybookRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter, which PlaybookRuns to fetch.
     */
    where?: PlaybookRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybookRuns to fetch.
     */
    orderBy?: PlaybookRunOrderByWithRelationInput | PlaybookRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaybookRuns.
     */
    cursor?: PlaybookRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybookRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybookRuns.
     */
    skip?: number
    distinct?: PlaybookRunScalarFieldEnum | PlaybookRunScalarFieldEnum[]
  }

  /**
   * PlaybookRun create
   */
  export type PlaybookRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * The data needed to create a PlaybookRun.
     */
    data: XOR<PlaybookRunCreateInput, PlaybookRunUncheckedCreateInput>
  }

  /**
   * PlaybookRun createMany
   */
  export type PlaybookRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaybookRuns.
     */
    data: PlaybookRunCreateManyInput | PlaybookRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaybookRun createManyAndReturn
   */
  export type PlaybookRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * The data used to create many PlaybookRuns.
     */
    data: PlaybookRunCreateManyInput | PlaybookRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybookRun update
   */
  export type PlaybookRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * The data needed to update a PlaybookRun.
     */
    data: XOR<PlaybookRunUpdateInput, PlaybookRunUncheckedUpdateInput>
    /**
     * Choose, which PlaybookRun to update.
     */
    where: PlaybookRunWhereUniqueInput
  }

  /**
   * PlaybookRun updateMany
   */
  export type PlaybookRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaybookRuns.
     */
    data: XOR<PlaybookRunUpdateManyMutationInput, PlaybookRunUncheckedUpdateManyInput>
    /**
     * Filter which PlaybookRuns to update
     */
    where?: PlaybookRunWhereInput
    /**
     * Limit how many PlaybookRuns to update.
     */
    limit?: number
  }

  /**
   * PlaybookRun updateManyAndReturn
   */
  export type PlaybookRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * The data used to update PlaybookRuns.
     */
    data: XOR<PlaybookRunUpdateManyMutationInput, PlaybookRunUncheckedUpdateManyInput>
    /**
     * Filter which PlaybookRuns to update
     */
    where?: PlaybookRunWhereInput
    /**
     * Limit how many PlaybookRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybookRun upsert
   */
  export type PlaybookRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * The filter to search for the PlaybookRun to update in case it exists.
     */
    where: PlaybookRunWhereUniqueInput
    /**
     * In case the PlaybookRun found by the `where` argument doesn't exist, create a new PlaybookRun with this data.
     */
    create: XOR<PlaybookRunCreateInput, PlaybookRunUncheckedCreateInput>
    /**
     * In case the PlaybookRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaybookRunUpdateInput, PlaybookRunUncheckedUpdateInput>
  }

  /**
   * PlaybookRun delete
   */
  export type PlaybookRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
    /**
     * Filter which PlaybookRun to delete.
     */
    where: PlaybookRunWhereUniqueInput
  }

  /**
   * PlaybookRun deleteMany
   */
  export type PlaybookRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybookRuns to delete
     */
    where?: PlaybookRunWhereInput
    /**
     * Limit how many PlaybookRuns to delete.
     */
    limit?: number
  }

  /**
   * PlaybookRun without action
   */
  export type PlaybookRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybookRun
     */
    select?: PlaybookRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybookRun
     */
    omit?: PlaybookRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybookRunInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    userId: string | null
    userEmail: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    resourceName: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    userEmail: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    resourceName: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    userEmail: number
    action: number
    resourceType: number
    resourceId: number
    resourceName: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    action?: true
    resourceType?: true
    resourceId?: true
    resourceName?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    action?: true
    resourceType?: true
    resourceId?: true
    resourceName?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    action?: true
    resourceType?: true
    resourceId?: true
    resourceName?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    userId: string
    userEmail: string
    action: string
    resourceType: string
    resourceId: string
    resourceName: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    resourceName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    resourceName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    resourceName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    resourceName?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userEmail" | "action" | "resourceType" | "resourceId" | "resourceName" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      userEmail: string
      action: string
      resourceType: string
      resourceId: string
      resourceName: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly userEmail: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resourceType: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly resourceName: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model RequestHistory
   */

  export type AggregateRequestHistory = {
    _count: RequestHistoryCountAggregateOutputType | null
    _avg: RequestHistoryAvgAggregateOutputType | null
    _sum: RequestHistorySumAggregateOutputType | null
    _min: RequestHistoryMinAggregateOutputType | null
    _max: RequestHistoryMaxAggregateOutputType | null
  }

  export type RequestHistoryAvgAggregateOutputType = {
    id: number | null
    statusCode: number | null
    durationMs: number | null
    companyId: number | null
    endpointId: number | null
    testClientId: number | null
  }

  export type RequestHistorySumAggregateOutputType = {
    id: number | null
    statusCode: number | null
    durationMs: number | null
    companyId: number | null
    endpointId: number | null
    testClientId: number | null
  }

  export type RequestHistoryMinAggregateOutputType = {
    id: number | null
    erpName: string | null
    companyName: string | null
    endpointName: string | null
    clientName: string | null
    method: string | null
    url: string | null
    requestBody: string | null
    requestHeaders: string | null
    statusCode: number | null
    responseBody: string | null
    responseHeaders: string | null
    durationMs: number | null
    companyId: number | null
    endpointId: number | null
    testClientId: number | null
    createdAt: Date | null
  }

  export type RequestHistoryMaxAggregateOutputType = {
    id: number | null
    erpName: string | null
    companyName: string | null
    endpointName: string | null
    clientName: string | null
    method: string | null
    url: string | null
    requestBody: string | null
    requestHeaders: string | null
    statusCode: number | null
    responseBody: string | null
    responseHeaders: string | null
    durationMs: number | null
    companyId: number | null
    endpointId: number | null
    testClientId: number | null
    createdAt: Date | null
  }

  export type RequestHistoryCountAggregateOutputType = {
    id: number
    erpName: number
    companyName: number
    endpointName: number
    clientName: number
    method: number
    url: number
    requestBody: number
    requestHeaders: number
    statusCode: number
    responseBody: number
    responseHeaders: number
    durationMs: number
    companyId: number
    endpointId: number
    testClientId: number
    createdAt: number
    _all: number
  }


  export type RequestHistoryAvgAggregateInputType = {
    id?: true
    statusCode?: true
    durationMs?: true
    companyId?: true
    endpointId?: true
    testClientId?: true
  }

  export type RequestHistorySumAggregateInputType = {
    id?: true
    statusCode?: true
    durationMs?: true
    companyId?: true
    endpointId?: true
    testClientId?: true
  }

  export type RequestHistoryMinAggregateInputType = {
    id?: true
    erpName?: true
    companyName?: true
    endpointName?: true
    clientName?: true
    method?: true
    url?: true
    requestBody?: true
    requestHeaders?: true
    statusCode?: true
    responseBody?: true
    responseHeaders?: true
    durationMs?: true
    companyId?: true
    endpointId?: true
    testClientId?: true
    createdAt?: true
  }

  export type RequestHistoryMaxAggregateInputType = {
    id?: true
    erpName?: true
    companyName?: true
    endpointName?: true
    clientName?: true
    method?: true
    url?: true
    requestBody?: true
    requestHeaders?: true
    statusCode?: true
    responseBody?: true
    responseHeaders?: true
    durationMs?: true
    companyId?: true
    endpointId?: true
    testClientId?: true
    createdAt?: true
  }

  export type RequestHistoryCountAggregateInputType = {
    id?: true
    erpName?: true
    companyName?: true
    endpointName?: true
    clientName?: true
    method?: true
    url?: true
    requestBody?: true
    requestHeaders?: true
    statusCode?: true
    responseBody?: true
    responseHeaders?: true
    durationMs?: true
    companyId?: true
    endpointId?: true
    testClientId?: true
    createdAt?: true
    _all?: true
  }

  export type RequestHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestHistory to aggregate.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestHistories
    **/
    _count?: true | RequestHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestHistoryMaxAggregateInputType
  }

  export type GetRequestHistoryAggregateType<T extends RequestHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestHistory[P]>
      : GetScalarType<T[P], AggregateRequestHistory[P]>
  }




  export type RequestHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestHistoryWhereInput
    orderBy?: RequestHistoryOrderByWithAggregationInput | RequestHistoryOrderByWithAggregationInput[]
    by: RequestHistoryScalarFieldEnum[] | RequestHistoryScalarFieldEnum
    having?: RequestHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestHistoryCountAggregateInputType | true
    _avg?: RequestHistoryAvgAggregateInputType
    _sum?: RequestHistorySumAggregateInputType
    _min?: RequestHistoryMinAggregateInputType
    _max?: RequestHistoryMaxAggregateInputType
  }

  export type RequestHistoryGroupByOutputType = {
    id: number
    erpName: string
    companyName: string
    endpointName: string
    clientName: string
    method: string
    url: string
    requestBody: string
    requestHeaders: string
    statusCode: number
    responseBody: string
    responseHeaders: string
    durationMs: number
    companyId: number | null
    endpointId: number | null
    testClientId: number | null
    createdAt: Date
    _count: RequestHistoryCountAggregateOutputType | null
    _avg: RequestHistoryAvgAggregateOutputType | null
    _sum: RequestHistorySumAggregateOutputType | null
    _min: RequestHistoryMinAggregateOutputType | null
    _max: RequestHistoryMaxAggregateOutputType | null
  }

  type GetRequestHistoryGroupByPayload<T extends RequestHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], RequestHistoryGroupByOutputType[P]>
        }
      >
    >


  export type RequestHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpName?: boolean
    companyName?: boolean
    endpointName?: boolean
    clientName?: boolean
    method?: boolean
    url?: boolean
    requestBody?: boolean
    requestHeaders?: boolean
    statusCode?: boolean
    responseBody?: boolean
    responseHeaders?: boolean
    durationMs?: boolean
    companyId?: boolean
    endpointId?: boolean
    testClientId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpName?: boolean
    companyName?: boolean
    endpointName?: boolean
    clientName?: boolean
    method?: boolean
    url?: boolean
    requestBody?: boolean
    requestHeaders?: boolean
    statusCode?: boolean
    responseBody?: boolean
    responseHeaders?: boolean
    durationMs?: boolean
    companyId?: boolean
    endpointId?: boolean
    testClientId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    erpName?: boolean
    companyName?: boolean
    endpointName?: boolean
    clientName?: boolean
    method?: boolean
    url?: boolean
    requestBody?: boolean
    requestHeaders?: boolean
    statusCode?: boolean
    responseBody?: boolean
    responseHeaders?: boolean
    durationMs?: boolean
    companyId?: boolean
    endpointId?: boolean
    testClientId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectScalar = {
    id?: boolean
    erpName?: boolean
    companyName?: boolean
    endpointName?: boolean
    clientName?: boolean
    method?: boolean
    url?: boolean
    requestBody?: boolean
    requestHeaders?: boolean
    statusCode?: boolean
    responseBody?: boolean
    responseHeaders?: boolean
    durationMs?: boolean
    companyId?: boolean
    endpointId?: boolean
    testClientId?: boolean
    createdAt?: boolean
  }

  export type RequestHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpName" | "companyName" | "endpointName" | "clientName" | "method" | "url" | "requestBody" | "requestHeaders" | "statusCode" | "responseBody" | "responseHeaders" | "durationMs" | "companyId" | "endpointId" | "testClientId" | "createdAt", ExtArgs["result"]["requestHistory"]>

  export type $RequestHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      erpName: string
      companyName: string
      endpointName: string
      clientName: string
      method: string
      url: string
      requestBody: string
      requestHeaders: string
      statusCode: number
      responseBody: string
      responseHeaders: string
      durationMs: number
      companyId: number | null
      endpointId: number | null
      testClientId: number | null
      createdAt: Date
    }, ExtArgs["result"]["requestHistory"]>
    composites: {}
  }

  type RequestHistoryGetPayload<S extends boolean | null | undefined | RequestHistoryDefaultArgs> = $Result.GetResult<Prisma.$RequestHistoryPayload, S>

  type RequestHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestHistoryCountAggregateInputType | true
    }

  export interface RequestHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestHistory'], meta: { name: 'RequestHistory' } }
    /**
     * Find zero or one RequestHistory that matches the filter.
     * @param {RequestHistoryFindUniqueArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestHistoryFindUniqueArgs>(args: SelectSubset<T, RequestHistoryFindUniqueArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestHistoryFindUniqueOrThrowArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindFirstArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestHistoryFindFirstArgs>(args?: SelectSubset<T, RequestHistoryFindFirstArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindFirstOrThrowArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestHistories
     * const requestHistories = await prisma.requestHistory.findMany()
     * 
     * // Get first 10 RequestHistories
     * const requestHistories = await prisma.requestHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestHistoryFindManyArgs>(args?: SelectSubset<T, RequestHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestHistory.
     * @param {RequestHistoryCreateArgs} args - Arguments to create a RequestHistory.
     * @example
     * // Create one RequestHistory
     * const RequestHistory = await prisma.requestHistory.create({
     *   data: {
     *     // ... data to create a RequestHistory
     *   }
     * })
     * 
     */
    create<T extends RequestHistoryCreateArgs>(args: SelectSubset<T, RequestHistoryCreateArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestHistories.
     * @param {RequestHistoryCreateManyArgs} args - Arguments to create many RequestHistories.
     * @example
     * // Create many RequestHistories
     * const requestHistory = await prisma.requestHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestHistoryCreateManyArgs>(args?: SelectSubset<T, RequestHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestHistories and returns the data saved in the database.
     * @param {RequestHistoryCreateManyAndReturnArgs} args - Arguments to create many RequestHistories.
     * @example
     * // Create many RequestHistories
     * const requestHistory = await prisma.requestHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestHistories and only return the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestHistory.
     * @param {RequestHistoryDeleteArgs} args - Arguments to delete one RequestHistory.
     * @example
     * // Delete one RequestHistory
     * const RequestHistory = await prisma.requestHistory.delete({
     *   where: {
     *     // ... filter to delete one RequestHistory
     *   }
     * })
     * 
     */
    delete<T extends RequestHistoryDeleteArgs>(args: SelectSubset<T, RequestHistoryDeleteArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestHistory.
     * @param {RequestHistoryUpdateArgs} args - Arguments to update one RequestHistory.
     * @example
     * // Update one RequestHistory
     * const requestHistory = await prisma.requestHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestHistoryUpdateArgs>(args: SelectSubset<T, RequestHistoryUpdateArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestHistories.
     * @param {RequestHistoryDeleteManyArgs} args - Arguments to filter RequestHistories to delete.
     * @example
     * // Delete a few RequestHistories
     * const { count } = await prisma.requestHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestHistoryDeleteManyArgs>(args?: SelectSubset<T, RequestHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestHistories
     * const requestHistory = await prisma.requestHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestHistoryUpdateManyArgs>(args: SelectSubset<T, RequestHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestHistories and returns the data updated in the database.
     * @param {RequestHistoryUpdateManyAndReturnArgs} args - Arguments to update many RequestHistories.
     * @example
     * // Update many RequestHistories
     * const requestHistory = await prisma.requestHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestHistories and only return the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestHistory.
     * @param {RequestHistoryUpsertArgs} args - Arguments to update or create a RequestHistory.
     * @example
     * // Update or create a RequestHistory
     * const requestHistory = await prisma.requestHistory.upsert({
     *   create: {
     *     // ... data to create a RequestHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestHistory we want to update
     *   }
     * })
     */
    upsert<T extends RequestHistoryUpsertArgs>(args: SelectSubset<T, RequestHistoryUpsertArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryCountArgs} args - Arguments to filter RequestHistories to count.
     * @example
     * // Count the number of RequestHistories
     * const count = await prisma.requestHistory.count({
     *   where: {
     *     // ... the filter for the RequestHistories we want to count
     *   }
     * })
    **/
    count<T extends RequestHistoryCountArgs>(
      args?: Subset<T, RequestHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestHistoryAggregateArgs>(args: Subset<T, RequestHistoryAggregateArgs>): Prisma.PrismaPromise<GetRequestHistoryAggregateType<T>>

    /**
     * Group by RequestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestHistoryGroupByArgs['orderBy'] }
        : { orderBy?: RequestHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestHistory model
   */
  readonly fields: RequestHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestHistory model
   */
  interface RequestHistoryFieldRefs {
    readonly id: FieldRef<"RequestHistory", 'Int'>
    readonly erpName: FieldRef<"RequestHistory", 'String'>
    readonly companyName: FieldRef<"RequestHistory", 'String'>
    readonly endpointName: FieldRef<"RequestHistory", 'String'>
    readonly clientName: FieldRef<"RequestHistory", 'String'>
    readonly method: FieldRef<"RequestHistory", 'String'>
    readonly url: FieldRef<"RequestHistory", 'String'>
    readonly requestBody: FieldRef<"RequestHistory", 'String'>
    readonly requestHeaders: FieldRef<"RequestHistory", 'String'>
    readonly statusCode: FieldRef<"RequestHistory", 'Int'>
    readonly responseBody: FieldRef<"RequestHistory", 'String'>
    readonly responseHeaders: FieldRef<"RequestHistory", 'String'>
    readonly durationMs: FieldRef<"RequestHistory", 'Int'>
    readonly companyId: FieldRef<"RequestHistory", 'Int'>
    readonly endpointId: FieldRef<"RequestHistory", 'Int'>
    readonly testClientId: FieldRef<"RequestHistory", 'Int'>
    readonly createdAt: FieldRef<"RequestHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestHistory findUnique
   */
  export type RequestHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory findUniqueOrThrow
   */
  export type RequestHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory findFirst
   */
  export type RequestHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestHistories.
     */
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory findFirstOrThrow
   */
  export type RequestHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestHistories.
     */
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory findMany
   */
  export type RequestHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter, which RequestHistories to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory create
   */
  export type RequestHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a RequestHistory.
     */
    data: XOR<RequestHistoryCreateInput, RequestHistoryUncheckedCreateInput>
  }

  /**
   * RequestHistory createMany
   */
  export type RequestHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestHistories.
     */
    data: RequestHistoryCreateManyInput | RequestHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestHistory createManyAndReturn
   */
  export type RequestHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many RequestHistories.
     */
    data: RequestHistoryCreateManyInput | RequestHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestHistory update
   */
  export type RequestHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a RequestHistory.
     */
    data: XOR<RequestHistoryUpdateInput, RequestHistoryUncheckedUpdateInput>
    /**
     * Choose, which RequestHistory to update.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory updateMany
   */
  export type RequestHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestHistories.
     */
    data: XOR<RequestHistoryUpdateManyMutationInput, RequestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RequestHistories to update
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to update.
     */
    limit?: number
  }

  /**
   * RequestHistory updateManyAndReturn
   */
  export type RequestHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data used to update RequestHistories.
     */
    data: XOR<RequestHistoryUpdateManyMutationInput, RequestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RequestHistories to update
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to update.
     */
    limit?: number
  }

  /**
   * RequestHistory upsert
   */
  export type RequestHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the RequestHistory to update in case it exists.
     */
    where: RequestHistoryWhereUniqueInput
    /**
     * In case the RequestHistory found by the `where` argument doesn't exist, create a new RequestHistory with this data.
     */
    create: XOR<RequestHistoryCreateInput, RequestHistoryUncheckedCreateInput>
    /**
     * In case the RequestHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestHistoryUpdateInput, RequestHistoryUncheckedUpdateInput>
  }

  /**
   * RequestHistory delete
   */
  export type RequestHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Filter which RequestHistory to delete.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory deleteMany
   */
  export type RequestHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestHistories to delete
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to delete.
     */
    limit?: number
  }

  /**
   * RequestHistory without action
   */
  export type RequestHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ERPScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ERPScalarFieldEnum = (typeof ERPScalarFieldEnum)[keyof typeof ERPScalarFieldEnum]


  export const ERPFieldSchemaScalarFieldEnum: {
    id: 'id',
    erpId: 'erpId',
    fieldName: 'fieldName',
    label: 'label',
    fieldType: 'fieldType',
    required: 'required',
    sortOrder: 'sortOrder',
    sourceEndpointId: 'sourceEndpointId',
    endpointParam: 'endpointParam',
    responsePath: 'responsePath'
  };

  export type ERPFieldSchemaScalarFieldEnum = (typeof ERPFieldSchemaScalarFieldEnum)[keyof typeof ERPFieldSchemaScalarFieldEnum]


  export const EndpointScalarFieldEnum: {
    id: 'id',
    erpId: 'erpId',
    name: 'name',
    method: 'method',
    pathTemplate: 'pathTemplate',
    bodyTemplate: 'bodyTemplate',
    headers: 'headers',
    sortOrder: 'sortOrder',
    group: 'group',
    requiresClient: 'requiresClient',
    isModification: 'isModification',
    notes: 'notes'
  };

  export type EndpointScalarFieldEnum = (typeof EndpointScalarFieldEnum)[keyof typeof EndpointScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    erpId: 'erpId',
    baseUrl: 'baseUrl',
    environments: 'environments',
    authType: 'authType',
    authConfig: 'authConfig',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const TestClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    fieldsData: 'fieldsData',
    createdAt: 'createdAt'
  };

  export type TestClientScalarFieldEnum = (typeof TestClientScalarFieldEnum)[keyof typeof TestClientScalarFieldEnum]


  export const PostmanCollectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    context: 'context',
    systemPrompt: 'systemPrompt',
    embeddingProvider: 'embeddingProvider',
    rawJson: 'rawJson',
    createdAt: 'createdAt'
  };

  export type PostmanCollectionScalarFieldEnum = (typeof PostmanCollectionScalarFieldEnum)[keyof typeof PostmanCollectionScalarFieldEnum]


  export const EmbeddingChunkScalarFieldEnum: {
    id: 'id',
    collectionId: 'collectionId',
    text: 'text'
  };

  export type EmbeddingChunkScalarFieldEnum = (typeof EmbeddingChunkScalarFieldEnum)[keyof typeof EmbeddingChunkScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const PlaybookScalarFieldEnum: {
    id: 'id',
    erpId: 'erpId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PlaybookScalarFieldEnum = (typeof PlaybookScalarFieldEnum)[keyof typeof PlaybookScalarFieldEnum]


  export const PlaybookStepScalarFieldEnum: {
    id: 'id',
    playbookId: 'playbookId',
    order: 'order',
    endpointId: 'endpointId',
    stepName: 'stepName',
    bodyOverride: 'bodyOverride',
    responseCapture: 'responseCapture'
  };

  export type PlaybookStepScalarFieldEnum = (typeof PlaybookStepScalarFieldEnum)[keyof typeof PlaybookStepScalarFieldEnum]


  export const PlaybookRunScalarFieldEnum: {
    id: 'id',
    playbookId: 'playbookId',
    companyId: 'companyId',
    clientId: 'clientId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    status: 'status',
    steps: 'steps',
    shareToken: 'shareToken'
  };

  export type PlaybookRunScalarFieldEnum = (typeof PlaybookRunScalarFieldEnum)[keyof typeof PlaybookRunScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userEmail: 'userEmail',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    resourceName: 'resourceName',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const RequestHistoryScalarFieldEnum: {
    id: 'id',
    erpName: 'erpName',
    companyName: 'companyName',
    endpointName: 'endpointName',
    clientName: 'clientName',
    method: 'method',
    url: 'url',
    requestBody: 'requestBody',
    requestHeaders: 'requestHeaders',
    statusCode: 'statusCode',
    responseBody: 'responseBody',
    responseHeaders: 'responseHeaders',
    durationMs: 'durationMs',
    companyId: 'companyId',
    endpointId: 'endpointId',
    testClientId: 'testClientId',
    createdAt: 'createdAt'
  };

  export type RequestHistoryScalarFieldEnum = (typeof RequestHistoryScalarFieldEnum)[keyof typeof RequestHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ERPWhereInput = {
    AND?: ERPWhereInput | ERPWhereInput[]
    OR?: ERPWhereInput[]
    NOT?: ERPWhereInput | ERPWhereInput[]
    id?: IntFilter<"ERP"> | number
    name?: StringFilter<"ERP"> | string
    createdAt?: DateTimeFilter<"ERP"> | Date | string
    companies?: CompanyListRelationFilter
    endpoints?: EndpointListRelationFilter
    fieldSchemas?: ERPFieldSchemaListRelationFilter
    playbooks?: PlaybookListRelationFilter
  }

  export type ERPOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    companies?: CompanyOrderByRelationAggregateInput
    endpoints?: EndpointOrderByRelationAggregateInput
    fieldSchemas?: ERPFieldSchemaOrderByRelationAggregateInput
    playbooks?: PlaybookOrderByRelationAggregateInput
  }

  export type ERPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ERPWhereInput | ERPWhereInput[]
    OR?: ERPWhereInput[]
    NOT?: ERPWhereInput | ERPWhereInput[]
    createdAt?: DateTimeFilter<"ERP"> | Date | string
    companies?: CompanyListRelationFilter
    endpoints?: EndpointListRelationFilter
    fieldSchemas?: ERPFieldSchemaListRelationFilter
    playbooks?: PlaybookListRelationFilter
  }, "id" | "name">

  export type ERPOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ERPCountOrderByAggregateInput
    _avg?: ERPAvgOrderByAggregateInput
    _max?: ERPMaxOrderByAggregateInput
    _min?: ERPMinOrderByAggregateInput
    _sum?: ERPSumOrderByAggregateInput
  }

  export type ERPScalarWhereWithAggregatesInput = {
    AND?: ERPScalarWhereWithAggregatesInput | ERPScalarWhereWithAggregatesInput[]
    OR?: ERPScalarWhereWithAggregatesInput[]
    NOT?: ERPScalarWhereWithAggregatesInput | ERPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ERP"> | number
    name?: StringWithAggregatesFilter<"ERP"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ERP"> | Date | string
  }

  export type ERPFieldSchemaWhereInput = {
    AND?: ERPFieldSchemaWhereInput | ERPFieldSchemaWhereInput[]
    OR?: ERPFieldSchemaWhereInput[]
    NOT?: ERPFieldSchemaWhereInput | ERPFieldSchemaWhereInput[]
    id?: IntFilter<"ERPFieldSchema"> | number
    erpId?: IntFilter<"ERPFieldSchema"> | number
    fieldName?: StringFilter<"ERPFieldSchema"> | string
    label?: StringFilter<"ERPFieldSchema"> | string
    fieldType?: StringFilter<"ERPFieldSchema"> | string
    required?: BoolFilter<"ERPFieldSchema"> | boolean
    sortOrder?: IntFilter<"ERPFieldSchema"> | number
    sourceEndpointId?: IntNullableFilter<"ERPFieldSchema"> | number | null
    endpointParam?: StringFilter<"ERPFieldSchema"> | string
    responsePath?: StringFilter<"ERPFieldSchema"> | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
  }

  export type ERPFieldSchemaOrderByWithRelationInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrderInput | SortOrder
    endpointParam?: SortOrder
    responsePath?: SortOrder
    erp?: ERPOrderByWithRelationInput
  }

  export type ERPFieldSchemaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ERPFieldSchemaWhereInput | ERPFieldSchemaWhereInput[]
    OR?: ERPFieldSchemaWhereInput[]
    NOT?: ERPFieldSchemaWhereInput | ERPFieldSchemaWhereInput[]
    erpId?: IntFilter<"ERPFieldSchema"> | number
    fieldName?: StringFilter<"ERPFieldSchema"> | string
    label?: StringFilter<"ERPFieldSchema"> | string
    fieldType?: StringFilter<"ERPFieldSchema"> | string
    required?: BoolFilter<"ERPFieldSchema"> | boolean
    sortOrder?: IntFilter<"ERPFieldSchema"> | number
    sourceEndpointId?: IntNullableFilter<"ERPFieldSchema"> | number | null
    endpointParam?: StringFilter<"ERPFieldSchema"> | string
    responsePath?: StringFilter<"ERPFieldSchema"> | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
  }, "id">

  export type ERPFieldSchemaOrderByWithAggregationInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrderInput | SortOrder
    endpointParam?: SortOrder
    responsePath?: SortOrder
    _count?: ERPFieldSchemaCountOrderByAggregateInput
    _avg?: ERPFieldSchemaAvgOrderByAggregateInput
    _max?: ERPFieldSchemaMaxOrderByAggregateInput
    _min?: ERPFieldSchemaMinOrderByAggregateInput
    _sum?: ERPFieldSchemaSumOrderByAggregateInput
  }

  export type ERPFieldSchemaScalarWhereWithAggregatesInput = {
    AND?: ERPFieldSchemaScalarWhereWithAggregatesInput | ERPFieldSchemaScalarWhereWithAggregatesInput[]
    OR?: ERPFieldSchemaScalarWhereWithAggregatesInput[]
    NOT?: ERPFieldSchemaScalarWhereWithAggregatesInput | ERPFieldSchemaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ERPFieldSchema"> | number
    erpId?: IntWithAggregatesFilter<"ERPFieldSchema"> | number
    fieldName?: StringWithAggregatesFilter<"ERPFieldSchema"> | string
    label?: StringWithAggregatesFilter<"ERPFieldSchema"> | string
    fieldType?: StringWithAggregatesFilter<"ERPFieldSchema"> | string
    required?: BoolWithAggregatesFilter<"ERPFieldSchema"> | boolean
    sortOrder?: IntWithAggregatesFilter<"ERPFieldSchema"> | number
    sourceEndpointId?: IntNullableWithAggregatesFilter<"ERPFieldSchema"> | number | null
    endpointParam?: StringWithAggregatesFilter<"ERPFieldSchema"> | string
    responsePath?: StringWithAggregatesFilter<"ERPFieldSchema"> | string
  }

  export type EndpointWhereInput = {
    AND?: EndpointWhereInput | EndpointWhereInput[]
    OR?: EndpointWhereInput[]
    NOT?: EndpointWhereInput | EndpointWhereInput[]
    id?: IntFilter<"Endpoint"> | number
    erpId?: IntFilter<"Endpoint"> | number
    name?: StringFilter<"Endpoint"> | string
    method?: StringFilter<"Endpoint"> | string
    pathTemplate?: StringFilter<"Endpoint"> | string
    bodyTemplate?: StringFilter<"Endpoint"> | string
    headers?: StringFilter<"Endpoint"> | string
    sortOrder?: IntFilter<"Endpoint"> | number
    group?: StringFilter<"Endpoint"> | string
    requiresClient?: BoolFilter<"Endpoint"> | boolean
    isModification?: BoolFilter<"Endpoint"> | boolean
    notes?: StringFilter<"Endpoint"> | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    playbookSteps?: PlaybookStepListRelationFilter
  }

  export type EndpointOrderByWithRelationInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    method?: SortOrder
    pathTemplate?: SortOrder
    bodyTemplate?: SortOrder
    headers?: SortOrder
    sortOrder?: SortOrder
    group?: SortOrder
    requiresClient?: SortOrder
    isModification?: SortOrder
    notes?: SortOrder
    erp?: ERPOrderByWithRelationInput
    playbookSteps?: PlaybookStepOrderByRelationAggregateInput
  }

  export type EndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EndpointWhereInput | EndpointWhereInput[]
    OR?: EndpointWhereInput[]
    NOT?: EndpointWhereInput | EndpointWhereInput[]
    erpId?: IntFilter<"Endpoint"> | number
    name?: StringFilter<"Endpoint"> | string
    method?: StringFilter<"Endpoint"> | string
    pathTemplate?: StringFilter<"Endpoint"> | string
    bodyTemplate?: StringFilter<"Endpoint"> | string
    headers?: StringFilter<"Endpoint"> | string
    sortOrder?: IntFilter<"Endpoint"> | number
    group?: StringFilter<"Endpoint"> | string
    requiresClient?: BoolFilter<"Endpoint"> | boolean
    isModification?: BoolFilter<"Endpoint"> | boolean
    notes?: StringFilter<"Endpoint"> | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    playbookSteps?: PlaybookStepListRelationFilter
  }, "id">

  export type EndpointOrderByWithAggregationInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    method?: SortOrder
    pathTemplate?: SortOrder
    bodyTemplate?: SortOrder
    headers?: SortOrder
    sortOrder?: SortOrder
    group?: SortOrder
    requiresClient?: SortOrder
    isModification?: SortOrder
    notes?: SortOrder
    _count?: EndpointCountOrderByAggregateInput
    _avg?: EndpointAvgOrderByAggregateInput
    _max?: EndpointMaxOrderByAggregateInput
    _min?: EndpointMinOrderByAggregateInput
    _sum?: EndpointSumOrderByAggregateInput
  }

  export type EndpointScalarWhereWithAggregatesInput = {
    AND?: EndpointScalarWhereWithAggregatesInput | EndpointScalarWhereWithAggregatesInput[]
    OR?: EndpointScalarWhereWithAggregatesInput[]
    NOT?: EndpointScalarWhereWithAggregatesInput | EndpointScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Endpoint"> | number
    erpId?: IntWithAggregatesFilter<"Endpoint"> | number
    name?: StringWithAggregatesFilter<"Endpoint"> | string
    method?: StringWithAggregatesFilter<"Endpoint"> | string
    pathTemplate?: StringWithAggregatesFilter<"Endpoint"> | string
    bodyTemplate?: StringWithAggregatesFilter<"Endpoint"> | string
    headers?: StringWithAggregatesFilter<"Endpoint"> | string
    sortOrder?: IntWithAggregatesFilter<"Endpoint"> | number
    group?: StringWithAggregatesFilter<"Endpoint"> | string
    requiresClient?: BoolWithAggregatesFilter<"Endpoint"> | boolean
    isModification?: BoolWithAggregatesFilter<"Endpoint"> | boolean
    notes?: StringWithAggregatesFilter<"Endpoint"> | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    erpId?: IntFilter<"Company"> | number
    baseUrl?: StringFilter<"Company"> | string
    environments?: JsonFilter<"Company">
    authType?: StringFilter<"Company"> | string
    authConfig?: JsonFilter<"Company">
    notes?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    testClients?: TestClientListRelationFilter
    playbookRuns?: PlaybookRunListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    environments?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    erp?: ERPOrderByWithRelationInput
    testClients?: TestClientOrderByRelationAggregateInput
    playbookRuns?: PlaybookRunOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    erpId?: IntFilter<"Company"> | number
    baseUrl?: StringFilter<"Company"> | string
    environments?: JsonFilter<"Company">
    authType?: StringFilter<"Company"> | string
    authConfig?: JsonFilter<"Company">
    notes?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    testClients?: TestClientListRelationFilter
    playbookRuns?: PlaybookRunListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    environments?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    erpId?: IntWithAggregatesFilter<"Company"> | number
    baseUrl?: StringWithAggregatesFilter<"Company"> | string
    environments?: JsonWithAggregatesFilter<"Company">
    authType?: StringWithAggregatesFilter<"Company"> | string
    authConfig?: JsonWithAggregatesFilter<"Company">
    notes?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type TestClientWhereInput = {
    AND?: TestClientWhereInput | TestClientWhereInput[]
    OR?: TestClientWhereInput[]
    NOT?: TestClientWhereInput | TestClientWhereInput[]
    id?: IntFilter<"TestClient"> | number
    name?: StringFilter<"TestClient"> | string
    companyId?: IntFilter<"TestClient"> | number
    fieldsData?: JsonFilter<"TestClient">
    createdAt?: DateTimeFilter<"TestClient"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type TestClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    fieldsData?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type TestClientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TestClientWhereInput | TestClientWhereInput[]
    OR?: TestClientWhereInput[]
    NOT?: TestClientWhereInput | TestClientWhereInput[]
    name?: StringFilter<"TestClient"> | string
    companyId?: IntFilter<"TestClient"> | number
    fieldsData?: JsonFilter<"TestClient">
    createdAt?: DateTimeFilter<"TestClient"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type TestClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    fieldsData?: SortOrder
    createdAt?: SortOrder
    _count?: TestClientCountOrderByAggregateInput
    _avg?: TestClientAvgOrderByAggregateInput
    _max?: TestClientMaxOrderByAggregateInput
    _min?: TestClientMinOrderByAggregateInput
    _sum?: TestClientSumOrderByAggregateInput
  }

  export type TestClientScalarWhereWithAggregatesInput = {
    AND?: TestClientScalarWhereWithAggregatesInput | TestClientScalarWhereWithAggregatesInput[]
    OR?: TestClientScalarWhereWithAggregatesInput[]
    NOT?: TestClientScalarWhereWithAggregatesInput | TestClientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestClient"> | number
    name?: StringWithAggregatesFilter<"TestClient"> | string
    companyId?: IntWithAggregatesFilter<"TestClient"> | number
    fieldsData?: JsonWithAggregatesFilter<"TestClient">
    createdAt?: DateTimeWithAggregatesFilter<"TestClient"> | Date | string
  }

  export type PostmanCollectionWhereInput = {
    AND?: PostmanCollectionWhereInput | PostmanCollectionWhereInput[]
    OR?: PostmanCollectionWhereInput[]
    NOT?: PostmanCollectionWhereInput | PostmanCollectionWhereInput[]
    id?: IntFilter<"PostmanCollection"> | number
    name?: StringFilter<"PostmanCollection"> | string
    context?: StringFilter<"PostmanCollection"> | string
    systemPrompt?: StringFilter<"PostmanCollection"> | string
    embeddingProvider?: StringFilter<"PostmanCollection"> | string
    rawJson?: JsonNullableFilter<"PostmanCollection">
    createdAt?: DateTimeFilter<"PostmanCollection"> | Date | string
    chunks?: EmbeddingChunkListRelationFilter
  }

  export type PostmanCollectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    context?: SortOrder
    systemPrompt?: SortOrder
    embeddingProvider?: SortOrder
    rawJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chunks?: EmbeddingChunkOrderByRelationAggregateInput
  }

  export type PostmanCollectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostmanCollectionWhereInput | PostmanCollectionWhereInput[]
    OR?: PostmanCollectionWhereInput[]
    NOT?: PostmanCollectionWhereInput | PostmanCollectionWhereInput[]
    name?: StringFilter<"PostmanCollection"> | string
    context?: StringFilter<"PostmanCollection"> | string
    systemPrompt?: StringFilter<"PostmanCollection"> | string
    embeddingProvider?: StringFilter<"PostmanCollection"> | string
    rawJson?: JsonNullableFilter<"PostmanCollection">
    createdAt?: DateTimeFilter<"PostmanCollection"> | Date | string
    chunks?: EmbeddingChunkListRelationFilter
  }, "id">

  export type PostmanCollectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    context?: SortOrder
    systemPrompt?: SortOrder
    embeddingProvider?: SortOrder
    rawJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PostmanCollectionCountOrderByAggregateInput
    _avg?: PostmanCollectionAvgOrderByAggregateInput
    _max?: PostmanCollectionMaxOrderByAggregateInput
    _min?: PostmanCollectionMinOrderByAggregateInput
    _sum?: PostmanCollectionSumOrderByAggregateInput
  }

  export type PostmanCollectionScalarWhereWithAggregatesInput = {
    AND?: PostmanCollectionScalarWhereWithAggregatesInput | PostmanCollectionScalarWhereWithAggregatesInput[]
    OR?: PostmanCollectionScalarWhereWithAggregatesInput[]
    NOT?: PostmanCollectionScalarWhereWithAggregatesInput | PostmanCollectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PostmanCollection"> | number
    name?: StringWithAggregatesFilter<"PostmanCollection"> | string
    context?: StringWithAggregatesFilter<"PostmanCollection"> | string
    systemPrompt?: StringWithAggregatesFilter<"PostmanCollection"> | string
    embeddingProvider?: StringWithAggregatesFilter<"PostmanCollection"> | string
    rawJson?: JsonNullableWithAggregatesFilter<"PostmanCollection">
    createdAt?: DateTimeWithAggregatesFilter<"PostmanCollection"> | Date | string
  }

  export type EmbeddingChunkWhereInput = {
    AND?: EmbeddingChunkWhereInput | EmbeddingChunkWhereInput[]
    OR?: EmbeddingChunkWhereInput[]
    NOT?: EmbeddingChunkWhereInput | EmbeddingChunkWhereInput[]
    id?: IntFilter<"EmbeddingChunk"> | number
    collectionId?: IntFilter<"EmbeddingChunk"> | number
    text?: StringFilter<"EmbeddingChunk"> | string
    collection?: XOR<PostmanCollectionScalarRelationFilter, PostmanCollectionWhereInput>
  }

  export type EmbeddingChunkOrderByWithRelationInput = {
    id?: SortOrder
    collectionId?: SortOrder
    text?: SortOrder
    collection?: PostmanCollectionOrderByWithRelationInput
  }

  export type EmbeddingChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmbeddingChunkWhereInput | EmbeddingChunkWhereInput[]
    OR?: EmbeddingChunkWhereInput[]
    NOT?: EmbeddingChunkWhereInput | EmbeddingChunkWhereInput[]
    collectionId?: IntFilter<"EmbeddingChunk"> | number
    text?: StringFilter<"EmbeddingChunk"> | string
    collection?: XOR<PostmanCollectionScalarRelationFilter, PostmanCollectionWhereInput>
  }, "id">

  export type EmbeddingChunkOrderByWithAggregationInput = {
    id?: SortOrder
    collectionId?: SortOrder
    text?: SortOrder
    _count?: EmbeddingChunkCountOrderByAggregateInput
    _avg?: EmbeddingChunkAvgOrderByAggregateInput
    _max?: EmbeddingChunkMaxOrderByAggregateInput
    _min?: EmbeddingChunkMinOrderByAggregateInput
    _sum?: EmbeddingChunkSumOrderByAggregateInput
  }

  export type EmbeddingChunkScalarWhereWithAggregatesInput = {
    AND?: EmbeddingChunkScalarWhereWithAggregatesInput | EmbeddingChunkScalarWhereWithAggregatesInput[]
    OR?: EmbeddingChunkScalarWhereWithAggregatesInput[]
    NOT?: EmbeddingChunkScalarWhereWithAggregatesInput | EmbeddingChunkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmbeddingChunk"> | number
    collectionId?: IntWithAggregatesFilter<"EmbeddingChunk"> | number
    text?: StringWithAggregatesFilter<"EmbeddingChunk"> | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    key?: StringFilter<"Setting"> | string
    value?: StringFilter<"Setting"> | string
  }

  export type SettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: StringFilter<"Setting"> | string
  }, "key">

  export type SettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: StringWithAggregatesFilter<"Setting"> | string
  }

  export type PlaybookWhereInput = {
    AND?: PlaybookWhereInput | PlaybookWhereInput[]
    OR?: PlaybookWhereInput[]
    NOT?: PlaybookWhereInput | PlaybookWhereInput[]
    id?: IntFilter<"Playbook"> | number
    erpId?: IntFilter<"Playbook"> | number
    name?: StringFilter<"Playbook"> | string
    description?: StringFilter<"Playbook"> | string
    createdAt?: DateTimeFilter<"Playbook"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    steps?: PlaybookStepListRelationFilter
    runs?: PlaybookRunListRelationFilter
  }

  export type PlaybookOrderByWithRelationInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    erp?: ERPOrderByWithRelationInput
    steps?: PlaybookStepOrderByRelationAggregateInput
    runs?: PlaybookRunOrderByRelationAggregateInput
  }

  export type PlaybookWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlaybookWhereInput | PlaybookWhereInput[]
    OR?: PlaybookWhereInput[]
    NOT?: PlaybookWhereInput | PlaybookWhereInput[]
    erpId?: IntFilter<"Playbook"> | number
    name?: StringFilter<"Playbook"> | string
    description?: StringFilter<"Playbook"> | string
    createdAt?: DateTimeFilter<"Playbook"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    steps?: PlaybookStepListRelationFilter
    runs?: PlaybookRunListRelationFilter
  }, "id">

  export type PlaybookOrderByWithAggregationInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    _count?: PlaybookCountOrderByAggregateInput
    _avg?: PlaybookAvgOrderByAggregateInput
    _max?: PlaybookMaxOrderByAggregateInput
    _min?: PlaybookMinOrderByAggregateInput
    _sum?: PlaybookSumOrderByAggregateInput
  }

  export type PlaybookScalarWhereWithAggregatesInput = {
    AND?: PlaybookScalarWhereWithAggregatesInput | PlaybookScalarWhereWithAggregatesInput[]
    OR?: PlaybookScalarWhereWithAggregatesInput[]
    NOT?: PlaybookScalarWhereWithAggregatesInput | PlaybookScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Playbook"> | number
    erpId?: IntWithAggregatesFilter<"Playbook"> | number
    name?: StringWithAggregatesFilter<"Playbook"> | string
    description?: StringWithAggregatesFilter<"Playbook"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Playbook"> | Date | string
  }

  export type PlaybookStepWhereInput = {
    AND?: PlaybookStepWhereInput | PlaybookStepWhereInput[]
    OR?: PlaybookStepWhereInput[]
    NOT?: PlaybookStepWhereInput | PlaybookStepWhereInput[]
    id?: IntFilter<"PlaybookStep"> | number
    playbookId?: IntFilter<"PlaybookStep"> | number
    order?: IntFilter<"PlaybookStep"> | number
    endpointId?: IntFilter<"PlaybookStep"> | number
    stepName?: StringFilter<"PlaybookStep"> | string
    bodyOverride?: StringFilter<"PlaybookStep"> | string
    responseCapture?: StringFilter<"PlaybookStep"> | string
    playbook?: XOR<PlaybookScalarRelationFilter, PlaybookWhereInput>
    endpoint?: XOR<EndpointScalarRelationFilter, EndpointWhereInput>
  }

  export type PlaybookStepOrderByWithRelationInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
    stepName?: SortOrder
    bodyOverride?: SortOrder
    responseCapture?: SortOrder
    playbook?: PlaybookOrderByWithRelationInput
    endpoint?: EndpointOrderByWithRelationInput
  }

  export type PlaybookStepWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlaybookStepWhereInput | PlaybookStepWhereInput[]
    OR?: PlaybookStepWhereInput[]
    NOT?: PlaybookStepWhereInput | PlaybookStepWhereInput[]
    playbookId?: IntFilter<"PlaybookStep"> | number
    order?: IntFilter<"PlaybookStep"> | number
    endpointId?: IntFilter<"PlaybookStep"> | number
    stepName?: StringFilter<"PlaybookStep"> | string
    bodyOverride?: StringFilter<"PlaybookStep"> | string
    responseCapture?: StringFilter<"PlaybookStep"> | string
    playbook?: XOR<PlaybookScalarRelationFilter, PlaybookWhereInput>
    endpoint?: XOR<EndpointScalarRelationFilter, EndpointWhereInput>
  }, "id">

  export type PlaybookStepOrderByWithAggregationInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
    stepName?: SortOrder
    bodyOverride?: SortOrder
    responseCapture?: SortOrder
    _count?: PlaybookStepCountOrderByAggregateInput
    _avg?: PlaybookStepAvgOrderByAggregateInput
    _max?: PlaybookStepMaxOrderByAggregateInput
    _min?: PlaybookStepMinOrderByAggregateInput
    _sum?: PlaybookStepSumOrderByAggregateInput
  }

  export type PlaybookStepScalarWhereWithAggregatesInput = {
    AND?: PlaybookStepScalarWhereWithAggregatesInput | PlaybookStepScalarWhereWithAggregatesInput[]
    OR?: PlaybookStepScalarWhereWithAggregatesInput[]
    NOT?: PlaybookStepScalarWhereWithAggregatesInput | PlaybookStepScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlaybookStep"> | number
    playbookId?: IntWithAggregatesFilter<"PlaybookStep"> | number
    order?: IntWithAggregatesFilter<"PlaybookStep"> | number
    endpointId?: IntWithAggregatesFilter<"PlaybookStep"> | number
    stepName?: StringWithAggregatesFilter<"PlaybookStep"> | string
    bodyOverride?: StringWithAggregatesFilter<"PlaybookStep"> | string
    responseCapture?: StringWithAggregatesFilter<"PlaybookStep"> | string
  }

  export type PlaybookRunWhereInput = {
    AND?: PlaybookRunWhereInput | PlaybookRunWhereInput[]
    OR?: PlaybookRunWhereInput[]
    NOT?: PlaybookRunWhereInput | PlaybookRunWhereInput[]
    id?: IntFilter<"PlaybookRun"> | number
    playbookId?: IntFilter<"PlaybookRun"> | number
    companyId?: IntFilter<"PlaybookRun"> | number
    clientId?: IntNullableFilter<"PlaybookRun"> | number | null
    startedAt?: DateTimeFilter<"PlaybookRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"PlaybookRun"> | Date | string | null
    status?: StringFilter<"PlaybookRun"> | string
    steps?: JsonFilter<"PlaybookRun">
    shareToken?: StringNullableFilter<"PlaybookRun"> | string | null
    playbook?: XOR<PlaybookScalarRelationFilter, PlaybookWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type PlaybookRunOrderByWithRelationInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    steps?: SortOrder
    shareToken?: SortOrderInput | SortOrder
    playbook?: PlaybookOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
  }

  export type PlaybookRunWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    shareToken?: string
    AND?: PlaybookRunWhereInput | PlaybookRunWhereInput[]
    OR?: PlaybookRunWhereInput[]
    NOT?: PlaybookRunWhereInput | PlaybookRunWhereInput[]
    playbookId?: IntFilter<"PlaybookRun"> | number
    companyId?: IntFilter<"PlaybookRun"> | number
    clientId?: IntNullableFilter<"PlaybookRun"> | number | null
    startedAt?: DateTimeFilter<"PlaybookRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"PlaybookRun"> | Date | string | null
    status?: StringFilter<"PlaybookRun"> | string
    steps?: JsonFilter<"PlaybookRun">
    playbook?: XOR<PlaybookScalarRelationFilter, PlaybookWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "shareToken">

  export type PlaybookRunOrderByWithAggregationInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    steps?: SortOrder
    shareToken?: SortOrderInput | SortOrder
    _count?: PlaybookRunCountOrderByAggregateInput
    _avg?: PlaybookRunAvgOrderByAggregateInput
    _max?: PlaybookRunMaxOrderByAggregateInput
    _min?: PlaybookRunMinOrderByAggregateInput
    _sum?: PlaybookRunSumOrderByAggregateInput
  }

  export type PlaybookRunScalarWhereWithAggregatesInput = {
    AND?: PlaybookRunScalarWhereWithAggregatesInput | PlaybookRunScalarWhereWithAggregatesInput[]
    OR?: PlaybookRunScalarWhereWithAggregatesInput[]
    NOT?: PlaybookRunScalarWhereWithAggregatesInput | PlaybookRunScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlaybookRun"> | number
    playbookId?: IntWithAggregatesFilter<"PlaybookRun"> | number
    companyId?: IntWithAggregatesFilter<"PlaybookRun"> | number
    clientId?: IntNullableWithAggregatesFilter<"PlaybookRun"> | number | null
    startedAt?: DateTimeWithAggregatesFilter<"PlaybookRun"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"PlaybookRun"> | Date | string | null
    status?: StringWithAggregatesFilter<"PlaybookRun"> | string
    steps?: JsonWithAggregatesFilter<"PlaybookRun">
    shareToken?: StringNullableWithAggregatesFilter<"PlaybookRun"> | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    userId?: StringFilter<"AuditLog"> | string
    userEmail?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    resourceName?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    resourceName?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    userEmail?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    resourceName?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    resourceName?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    userEmail?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceType?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceName?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type RequestHistoryWhereInput = {
    AND?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    OR?: RequestHistoryWhereInput[]
    NOT?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    id?: IntFilter<"RequestHistory"> | number
    erpName?: StringFilter<"RequestHistory"> | string
    companyName?: StringFilter<"RequestHistory"> | string
    endpointName?: StringFilter<"RequestHistory"> | string
    clientName?: StringFilter<"RequestHistory"> | string
    method?: StringFilter<"RequestHistory"> | string
    url?: StringFilter<"RequestHistory"> | string
    requestBody?: StringFilter<"RequestHistory"> | string
    requestHeaders?: StringFilter<"RequestHistory"> | string
    statusCode?: IntFilter<"RequestHistory"> | number
    responseBody?: StringFilter<"RequestHistory"> | string
    responseHeaders?: StringFilter<"RequestHistory"> | string
    durationMs?: IntFilter<"RequestHistory"> | number
    companyId?: IntNullableFilter<"RequestHistory"> | number | null
    endpointId?: IntNullableFilter<"RequestHistory"> | number | null
    testClientId?: IntNullableFilter<"RequestHistory"> | number | null
    createdAt?: DateTimeFilter<"RequestHistory"> | Date | string
  }

  export type RequestHistoryOrderByWithRelationInput = {
    id?: SortOrder
    erpName?: SortOrder
    companyName?: SortOrder
    endpointName?: SortOrder
    clientName?: SortOrder
    method?: SortOrder
    url?: SortOrder
    requestBody?: SortOrder
    requestHeaders?: SortOrder
    statusCode?: SortOrder
    responseBody?: SortOrder
    responseHeaders?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrderInput | SortOrder
    endpointId?: SortOrderInput | SortOrder
    testClientId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    OR?: RequestHistoryWhereInput[]
    NOT?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    erpName?: StringFilter<"RequestHistory"> | string
    companyName?: StringFilter<"RequestHistory"> | string
    endpointName?: StringFilter<"RequestHistory"> | string
    clientName?: StringFilter<"RequestHistory"> | string
    method?: StringFilter<"RequestHistory"> | string
    url?: StringFilter<"RequestHistory"> | string
    requestBody?: StringFilter<"RequestHistory"> | string
    requestHeaders?: StringFilter<"RequestHistory"> | string
    statusCode?: IntFilter<"RequestHistory"> | number
    responseBody?: StringFilter<"RequestHistory"> | string
    responseHeaders?: StringFilter<"RequestHistory"> | string
    durationMs?: IntFilter<"RequestHistory"> | number
    companyId?: IntNullableFilter<"RequestHistory"> | number | null
    endpointId?: IntNullableFilter<"RequestHistory"> | number | null
    testClientId?: IntNullableFilter<"RequestHistory"> | number | null
    createdAt?: DateTimeFilter<"RequestHistory"> | Date | string
  }, "id">

  export type RequestHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    erpName?: SortOrder
    companyName?: SortOrder
    endpointName?: SortOrder
    clientName?: SortOrder
    method?: SortOrder
    url?: SortOrder
    requestBody?: SortOrder
    requestHeaders?: SortOrder
    statusCode?: SortOrder
    responseBody?: SortOrder
    responseHeaders?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrderInput | SortOrder
    endpointId?: SortOrderInput | SortOrder
    testClientId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestHistoryCountOrderByAggregateInput
    _avg?: RequestHistoryAvgOrderByAggregateInput
    _max?: RequestHistoryMaxOrderByAggregateInput
    _min?: RequestHistoryMinOrderByAggregateInput
    _sum?: RequestHistorySumOrderByAggregateInput
  }

  export type RequestHistoryScalarWhereWithAggregatesInput = {
    AND?: RequestHistoryScalarWhereWithAggregatesInput | RequestHistoryScalarWhereWithAggregatesInput[]
    OR?: RequestHistoryScalarWhereWithAggregatesInput[]
    NOT?: RequestHistoryScalarWhereWithAggregatesInput | RequestHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RequestHistory"> | number
    erpName?: StringWithAggregatesFilter<"RequestHistory"> | string
    companyName?: StringWithAggregatesFilter<"RequestHistory"> | string
    endpointName?: StringWithAggregatesFilter<"RequestHistory"> | string
    clientName?: StringWithAggregatesFilter<"RequestHistory"> | string
    method?: StringWithAggregatesFilter<"RequestHistory"> | string
    url?: StringWithAggregatesFilter<"RequestHistory"> | string
    requestBody?: StringWithAggregatesFilter<"RequestHistory"> | string
    requestHeaders?: StringWithAggregatesFilter<"RequestHistory"> | string
    statusCode?: IntWithAggregatesFilter<"RequestHistory"> | number
    responseBody?: StringWithAggregatesFilter<"RequestHistory"> | string
    responseHeaders?: StringWithAggregatesFilter<"RequestHistory"> | string
    durationMs?: IntWithAggregatesFilter<"RequestHistory"> | number
    companyId?: IntNullableWithAggregatesFilter<"RequestHistory"> | number | null
    endpointId?: IntNullableWithAggregatesFilter<"RequestHistory"> | number | null
    testClientId?: IntNullableWithAggregatesFilter<"RequestHistory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestHistory"> | Date | string
  }

  export type ERPCreateInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    endpoints?: EndpointCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
    playbooks?: PlaybookCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
    playbooks?: PlaybookUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUncheckedUpdateManyWithoutErpNestedInput
  }

  export type ERPCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
  }

  export type ERPUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ERPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ERPFieldSchemaCreateInput = {
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
    erp: ERPCreateNestedOneWithoutFieldSchemasInput
  }

  export type ERPFieldSchemaUncheckedCreateInput = {
    id?: number
    erpId: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }

  export type ERPFieldSchemaUpdateInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
    erp?: ERPUpdateOneRequiredWithoutFieldSchemasNestedInput
  }

  export type ERPFieldSchemaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type ERPFieldSchemaCreateManyInput = {
    id?: number
    erpId: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }

  export type ERPFieldSchemaUpdateManyMutationInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type ERPFieldSchemaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type EndpointCreateInput = {
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
    erp: ERPCreateNestedOneWithoutEndpointsInput
    playbookSteps?: PlaybookStepCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUncheckedCreateInput = {
    id?: number
    erpId: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
    playbookSteps?: PlaybookStepUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
    erp?: ERPUpdateOneRequiredWithoutEndpointsNestedInput
    playbookSteps?: PlaybookStepUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
    playbookSteps?: PlaybookStepUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointCreateManyInput = {
    id?: number
    erpId: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
  }

  export type EndpointUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
  }

  export type EndpointUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCreateInput = {
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutCompaniesInput
    testClients?: TestClientCreateNestedManyWithoutCompanyInput
    playbookRuns?: PlaybookRunCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    testClients?: TestClientUncheckedCreateNestedManyWithoutCompanyInput
    playbookRuns?: PlaybookRunUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutCompaniesNestedInput
    testClients?: TestClientUpdateManyWithoutCompanyNestedInput
    playbookRuns?: PlaybookRunUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUncheckedUpdateManyWithoutCompanyNestedInput
    playbookRuns?: PlaybookRunUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientCreateInput = {
    name: string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutTestClientsInput
  }

  export type TestClientUncheckedCreateInput = {
    id?: number
    name: string
    companyId: number
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TestClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTestClientsNestedInput
  }

  export type TestClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientCreateManyInput = {
    id?: number
    name: string
    companyId: number
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TestClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostmanCollectionCreateInput = {
    name: string
    context: string
    systemPrompt?: string
    embeddingProvider?: string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    chunks?: EmbeddingChunkCreateNestedManyWithoutCollectionInput
  }

  export type PostmanCollectionUncheckedCreateInput = {
    id?: number
    name: string
    context: string
    systemPrompt?: string
    embeddingProvider?: string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    chunks?: EmbeddingChunkUncheckedCreateNestedManyWithoutCollectionInput
  }

  export type PostmanCollectionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: EmbeddingChunkUpdateManyWithoutCollectionNestedInput
  }

  export type PostmanCollectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: EmbeddingChunkUncheckedUpdateManyWithoutCollectionNestedInput
  }

  export type PostmanCollectionCreateManyInput = {
    id?: number
    name: string
    context: string
    systemPrompt?: string
    embeddingProvider?: string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PostmanCollectionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostmanCollectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingChunkUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    collection?: PostmanCollectionUpdateOneRequiredWithoutChunksNestedInput
  }

  export type EmbeddingChunkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    collectionId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type EmbeddingChunkUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
  }

  export type EmbeddingChunkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    collectionId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type SettingCreateInput = {
    key: string
    value: string
  }

  export type SettingUncheckedCreateInput = {
    key: string
    value: string
  }

  export type SettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SettingCreateManyInput = {
    key: string
    value: string
  }

  export type SettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookCreateInput = {
    name: string
    description?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutPlaybooksInput
    steps?: PlaybookStepCreateNestedManyWithoutPlaybookInput
    runs?: PlaybookRunCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookUncheckedCreateInput = {
    id?: number
    erpId: number
    name: string
    description?: string
    createdAt?: Date | string
    steps?: PlaybookStepUncheckedCreateNestedManyWithoutPlaybookInput
    runs?: PlaybookRunUncheckedCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutPlaybooksNestedInput
    steps?: PlaybookStepUpdateManyWithoutPlaybookNestedInput
    runs?: PlaybookRunUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: PlaybookStepUncheckedUpdateManyWithoutPlaybookNestedInput
    runs?: PlaybookRunUncheckedUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookCreateManyInput = {
    id?: number
    erpId: number
    name: string
    description?: string
    createdAt?: Date | string
  }

  export type PlaybookUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaybookUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaybookStepCreateInput = {
    order: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
    playbook: PlaybookCreateNestedOneWithoutStepsInput
    endpoint: EndpointCreateNestedOneWithoutPlaybookStepsInput
  }

  export type PlaybookStepUncheckedCreateInput = {
    id?: number
    playbookId: number
    order: number
    endpointId: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookStepUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
    playbook?: PlaybookUpdateOneRequiredWithoutStepsNestedInput
    endpoint?: EndpointUpdateOneRequiredWithoutPlaybookStepsNestedInput
  }

  export type PlaybookStepUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    endpointId?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookStepCreateManyInput = {
    id?: number
    playbookId: number
    order: number
    endpointId: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookStepUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookStepUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    endpointId?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookRunCreateInput = {
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
    playbook: PlaybookCreateNestedOneWithoutRunsInput
    company: CompanyCreateNestedOneWithoutPlaybookRunsInput
  }

  export type PlaybookRunUncheckedCreateInput = {
    id?: number
    playbookId: number
    companyId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type PlaybookRunUpdateInput = {
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    playbook?: PlaybookUpdateOneRequiredWithoutRunsNestedInput
    company?: CompanyUpdateOneRequiredWithoutPlaybookRunsNestedInput
  }

  export type PlaybookRunUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlaybookRunCreateManyInput = {
    id?: number
    playbookId: number
    companyId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type PlaybookRunUpdateManyMutationInput = {
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlaybookRunUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateInput = {
    userId: string
    userEmail: string
    action: string
    resourceType: string
    resourceId: string
    resourceName: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    userId: string
    userEmail: string
    action: string
    resourceType: string
    resourceId: string
    resourceName: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    resourceName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    resourceName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    userId: string
    userEmail: string
    action: string
    resourceType: string
    resourceId: string
    resourceName: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    resourceName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    resourceName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryCreateInput = {
    erpName: string
    companyName: string
    endpointName: string
    clientName: string
    method: string
    url: string
    requestBody?: string
    requestHeaders?: string
    statusCode: number
    responseBody?: string
    responseHeaders?: string
    durationMs: number
    companyId?: number | null
    endpointId?: number | null
    testClientId?: number | null
    createdAt?: Date | string
  }

  export type RequestHistoryUncheckedCreateInput = {
    id?: number
    erpName: string
    companyName: string
    endpointName: string
    clientName: string
    method: string
    url: string
    requestBody?: string
    requestHeaders?: string
    statusCode: number
    responseBody?: string
    responseHeaders?: string
    durationMs: number
    companyId?: number | null
    endpointId?: number | null
    testClientId?: number | null
    createdAt?: Date | string
  }

  export type RequestHistoryUpdateInput = {
    erpName?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    endpointName?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    requestBody?: StringFieldUpdateOperationsInput | string
    requestHeaders?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    responseBody?: StringFieldUpdateOperationsInput | string
    responseHeaders?: StringFieldUpdateOperationsInput | string
    durationMs?: IntFieldUpdateOperationsInput | number
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointId?: NullableIntFieldUpdateOperationsInput | number | null
    testClientId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpName?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    endpointName?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    requestBody?: StringFieldUpdateOperationsInput | string
    requestHeaders?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    responseBody?: StringFieldUpdateOperationsInput | string
    responseHeaders?: StringFieldUpdateOperationsInput | string
    durationMs?: IntFieldUpdateOperationsInput | number
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointId?: NullableIntFieldUpdateOperationsInput | number | null
    testClientId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryCreateManyInput = {
    id?: number
    erpName: string
    companyName: string
    endpointName: string
    clientName: string
    method: string
    url: string
    requestBody?: string
    requestHeaders?: string
    statusCode: number
    responseBody?: string
    responseHeaders?: string
    durationMs: number
    companyId?: number | null
    endpointId?: number | null
    testClientId?: number | null
    createdAt?: Date | string
  }

  export type RequestHistoryUpdateManyMutationInput = {
    erpName?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    endpointName?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    requestBody?: StringFieldUpdateOperationsInput | string
    requestHeaders?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    responseBody?: StringFieldUpdateOperationsInput | string
    responseHeaders?: StringFieldUpdateOperationsInput | string
    durationMs?: IntFieldUpdateOperationsInput | number
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointId?: NullableIntFieldUpdateOperationsInput | number | null
    testClientId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpName?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    endpointName?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    requestBody?: StringFieldUpdateOperationsInput | string
    requestHeaders?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    responseBody?: StringFieldUpdateOperationsInput | string
    responseHeaders?: StringFieldUpdateOperationsInput | string
    durationMs?: IntFieldUpdateOperationsInput | number
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointId?: NullableIntFieldUpdateOperationsInput | number | null
    testClientId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CompanyListRelationFilter = {
    every?: CompanyWhereInput
    some?: CompanyWhereInput
    none?: CompanyWhereInput
  }

  export type EndpointListRelationFilter = {
    every?: EndpointWhereInput
    some?: EndpointWhereInput
    none?: EndpointWhereInput
  }

  export type ERPFieldSchemaListRelationFilter = {
    every?: ERPFieldSchemaWhereInput
    some?: ERPFieldSchemaWhereInput
    none?: ERPFieldSchemaWhereInput
  }

  export type PlaybookListRelationFilter = {
    every?: PlaybookWhereInput
    some?: PlaybookWhereInput
    none?: PlaybookWhereInput
  }

  export type CompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ERPFieldSchemaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaybookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ERPCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ERPAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ERPMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ERPMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ERPSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ERPScalarRelationFilter = {
    is?: ERPWhereInput
    isNot?: ERPWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ERPFieldSchemaCountOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrder
    endpointParam?: SortOrder
    responsePath?: SortOrder
  }

  export type ERPFieldSchemaAvgOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrder
  }

  export type ERPFieldSchemaMaxOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrder
    endpointParam?: SortOrder
    responsePath?: SortOrder
  }

  export type ERPFieldSchemaMinOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrder
    endpointParam?: SortOrder
    responsePath?: SortOrder
  }

  export type ERPFieldSchemaSumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
    sourceEndpointId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PlaybookStepListRelationFilter = {
    every?: PlaybookStepWhereInput
    some?: PlaybookStepWhereInput
    none?: PlaybookStepWhereInput
  }

  export type PlaybookStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EndpointCountOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    method?: SortOrder
    pathTemplate?: SortOrder
    bodyTemplate?: SortOrder
    headers?: SortOrder
    sortOrder?: SortOrder
    group?: SortOrder
    requiresClient?: SortOrder
    isModification?: SortOrder
    notes?: SortOrder
  }

  export type EndpointAvgOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
  }

  export type EndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    method?: SortOrder
    pathTemplate?: SortOrder
    bodyTemplate?: SortOrder
    headers?: SortOrder
    sortOrder?: SortOrder
    group?: SortOrder
    requiresClient?: SortOrder
    isModification?: SortOrder
    notes?: SortOrder
  }

  export type EndpointMinOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    method?: SortOrder
    pathTemplate?: SortOrder
    bodyTemplate?: SortOrder
    headers?: SortOrder
    sortOrder?: SortOrder
    group?: SortOrder
    requiresClient?: SortOrder
    isModification?: SortOrder
    notes?: SortOrder
  }

  export type EndpointSumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TestClientListRelationFilter = {
    every?: TestClientWhereInput
    some?: TestClientWhereInput
    none?: TestClientWhereInput
  }

  export type PlaybookRunListRelationFilter = {
    every?: PlaybookRunWhereInput
    some?: PlaybookRunWhereInput
    none?: PlaybookRunWhereInput
  }

  export type TestClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaybookRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    environments?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type TestClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    fieldsData?: SortOrder
    createdAt?: SortOrder
  }

  export type TestClientAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type TestClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type TestClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type TestClientSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EmbeddingChunkListRelationFilter = {
    every?: EmbeddingChunkWhereInput
    some?: EmbeddingChunkWhereInput
    none?: EmbeddingChunkWhereInput
  }

  export type EmbeddingChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostmanCollectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    context?: SortOrder
    systemPrompt?: SortOrder
    embeddingProvider?: SortOrder
    rawJson?: SortOrder
    createdAt?: SortOrder
  }

  export type PostmanCollectionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostmanCollectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    context?: SortOrder
    systemPrompt?: SortOrder
    embeddingProvider?: SortOrder
    createdAt?: SortOrder
  }

  export type PostmanCollectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    context?: SortOrder
    systemPrompt?: SortOrder
    embeddingProvider?: SortOrder
    createdAt?: SortOrder
  }

  export type PostmanCollectionSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PostmanCollectionScalarRelationFilter = {
    is?: PostmanCollectionWhereInput
    isNot?: PostmanCollectionWhereInput
  }

  export type EmbeddingChunkCountOrderByAggregateInput = {
    id?: SortOrder
    collectionId?: SortOrder
    text?: SortOrder
  }

  export type EmbeddingChunkAvgOrderByAggregateInput = {
    id?: SortOrder
    collectionId?: SortOrder
  }

  export type EmbeddingChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    collectionId?: SortOrder
    text?: SortOrder
  }

  export type EmbeddingChunkMinOrderByAggregateInput = {
    id?: SortOrder
    collectionId?: SortOrder
    text?: SortOrder
  }

  export type EmbeddingChunkSumOrderByAggregateInput = {
    id?: SortOrder
    collectionId?: SortOrder
  }

  export type SettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type PlaybookCountOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaybookAvgOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
  }

  export type PlaybookMaxOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaybookMinOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaybookSumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
  }

  export type PlaybookScalarRelationFilter = {
    is?: PlaybookWhereInput
    isNot?: PlaybookWhereInput
  }

  export type EndpointScalarRelationFilter = {
    is?: EndpointWhereInput
    isNot?: EndpointWhereInput
  }

  export type PlaybookStepCountOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
    stepName?: SortOrder
    bodyOverride?: SortOrder
    responseCapture?: SortOrder
  }

  export type PlaybookStepAvgOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
  }

  export type PlaybookStepMaxOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
    stepName?: SortOrder
    bodyOverride?: SortOrder
    responseCapture?: SortOrder
  }

  export type PlaybookStepMinOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
    stepName?: SortOrder
    bodyOverride?: SortOrder
    responseCapture?: SortOrder
  }

  export type PlaybookStepSumOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    order?: SortOrder
    endpointId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PlaybookRunCountOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    steps?: SortOrder
    shareToken?: SortOrder
  }

  export type PlaybookRunAvgOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrder
  }

  export type PlaybookRunMaxOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    shareToken?: SortOrder
  }

  export type PlaybookRunMinOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    shareToken?: SortOrder
  }

  export type PlaybookRunSumOrderByAggregateInput = {
    id?: SortOrder
    playbookId?: SortOrder
    companyId?: SortOrder
    clientId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    resourceName?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    resourceName?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    resourceName?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RequestHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    erpName?: SortOrder
    companyName?: SortOrder
    endpointName?: SortOrder
    clientName?: SortOrder
    method?: SortOrder
    url?: SortOrder
    requestBody?: SortOrder
    requestHeaders?: SortOrder
    statusCode?: SortOrder
    responseBody?: SortOrder
    responseHeaders?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrder
    endpointId?: SortOrder
    testClientId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    statusCode?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrder
    endpointId?: SortOrder
    testClientId?: SortOrder
  }

  export type RequestHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    erpName?: SortOrder
    companyName?: SortOrder
    endpointName?: SortOrder
    clientName?: SortOrder
    method?: SortOrder
    url?: SortOrder
    requestBody?: SortOrder
    requestHeaders?: SortOrder
    statusCode?: SortOrder
    responseBody?: SortOrder
    responseHeaders?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrder
    endpointId?: SortOrder
    testClientId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    erpName?: SortOrder
    companyName?: SortOrder
    endpointName?: SortOrder
    clientName?: SortOrder
    method?: SortOrder
    url?: SortOrder
    requestBody?: SortOrder
    requestHeaders?: SortOrder
    statusCode?: SortOrder
    responseBody?: SortOrder
    responseHeaders?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrder
    endpointId?: SortOrder
    testClientId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistorySumOrderByAggregateInput = {
    id?: SortOrder
    statusCode?: SortOrder
    durationMs?: SortOrder
    companyId?: SortOrder
    endpointId?: SortOrder
    testClientId?: SortOrder
  }

  export type CompanyCreateNestedManyWithoutErpInput = {
    create?: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput> | CompanyCreateWithoutErpInput[] | CompanyUncheckedCreateWithoutErpInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutErpInput | CompanyCreateOrConnectWithoutErpInput[]
    createMany?: CompanyCreateManyErpInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type EndpointCreateNestedManyWithoutErpInput = {
    create?: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput> | EndpointCreateWithoutErpInput[] | EndpointUncheckedCreateWithoutErpInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutErpInput | EndpointCreateOrConnectWithoutErpInput[]
    createMany?: EndpointCreateManyErpInputEnvelope
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
  }

  export type ERPFieldSchemaCreateNestedManyWithoutErpInput = {
    create?: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput> | ERPFieldSchemaCreateWithoutErpInput[] | ERPFieldSchemaUncheckedCreateWithoutErpInput[]
    connectOrCreate?: ERPFieldSchemaCreateOrConnectWithoutErpInput | ERPFieldSchemaCreateOrConnectWithoutErpInput[]
    createMany?: ERPFieldSchemaCreateManyErpInputEnvelope
    connect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
  }

  export type PlaybookCreateNestedManyWithoutErpInput = {
    create?: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput> | PlaybookCreateWithoutErpInput[] | PlaybookUncheckedCreateWithoutErpInput[]
    connectOrCreate?: PlaybookCreateOrConnectWithoutErpInput | PlaybookCreateOrConnectWithoutErpInput[]
    createMany?: PlaybookCreateManyErpInputEnvelope
    connect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutErpInput = {
    create?: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput> | CompanyCreateWithoutErpInput[] | CompanyUncheckedCreateWithoutErpInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutErpInput | CompanyCreateOrConnectWithoutErpInput[]
    createMany?: CompanyCreateManyErpInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type EndpointUncheckedCreateNestedManyWithoutErpInput = {
    create?: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput> | EndpointCreateWithoutErpInput[] | EndpointUncheckedCreateWithoutErpInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutErpInput | EndpointCreateOrConnectWithoutErpInput[]
    createMany?: EndpointCreateManyErpInputEnvelope
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
  }

  export type ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput = {
    create?: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput> | ERPFieldSchemaCreateWithoutErpInput[] | ERPFieldSchemaUncheckedCreateWithoutErpInput[]
    connectOrCreate?: ERPFieldSchemaCreateOrConnectWithoutErpInput | ERPFieldSchemaCreateOrConnectWithoutErpInput[]
    createMany?: ERPFieldSchemaCreateManyErpInputEnvelope
    connect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
  }

  export type PlaybookUncheckedCreateNestedManyWithoutErpInput = {
    create?: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput> | PlaybookCreateWithoutErpInput[] | PlaybookUncheckedCreateWithoutErpInput[]
    connectOrCreate?: PlaybookCreateOrConnectWithoutErpInput | PlaybookCreateOrConnectWithoutErpInput[]
    createMany?: PlaybookCreateManyErpInputEnvelope
    connect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CompanyUpdateManyWithoutErpNestedInput = {
    create?: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput> | CompanyCreateWithoutErpInput[] | CompanyUncheckedCreateWithoutErpInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutErpInput | CompanyCreateOrConnectWithoutErpInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutErpInput | CompanyUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: CompanyCreateManyErpInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutErpInput | CompanyUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutErpInput | CompanyUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type EndpointUpdateManyWithoutErpNestedInput = {
    create?: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput> | EndpointCreateWithoutErpInput[] | EndpointUncheckedCreateWithoutErpInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutErpInput | EndpointCreateOrConnectWithoutErpInput[]
    upsert?: EndpointUpsertWithWhereUniqueWithoutErpInput | EndpointUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: EndpointCreateManyErpInputEnvelope
    set?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    disconnect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    delete?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    update?: EndpointUpdateWithWhereUniqueWithoutErpInput | EndpointUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: EndpointUpdateManyWithWhereWithoutErpInput | EndpointUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
  }

  export type ERPFieldSchemaUpdateManyWithoutErpNestedInput = {
    create?: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput> | ERPFieldSchemaCreateWithoutErpInput[] | ERPFieldSchemaUncheckedCreateWithoutErpInput[]
    connectOrCreate?: ERPFieldSchemaCreateOrConnectWithoutErpInput | ERPFieldSchemaCreateOrConnectWithoutErpInput[]
    upsert?: ERPFieldSchemaUpsertWithWhereUniqueWithoutErpInput | ERPFieldSchemaUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: ERPFieldSchemaCreateManyErpInputEnvelope
    set?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    disconnect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    delete?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    connect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    update?: ERPFieldSchemaUpdateWithWhereUniqueWithoutErpInput | ERPFieldSchemaUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: ERPFieldSchemaUpdateManyWithWhereWithoutErpInput | ERPFieldSchemaUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: ERPFieldSchemaScalarWhereInput | ERPFieldSchemaScalarWhereInput[]
  }

  export type PlaybookUpdateManyWithoutErpNestedInput = {
    create?: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput> | PlaybookCreateWithoutErpInput[] | PlaybookUncheckedCreateWithoutErpInput[]
    connectOrCreate?: PlaybookCreateOrConnectWithoutErpInput | PlaybookCreateOrConnectWithoutErpInput[]
    upsert?: PlaybookUpsertWithWhereUniqueWithoutErpInput | PlaybookUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: PlaybookCreateManyErpInputEnvelope
    set?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    disconnect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    delete?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    connect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    update?: PlaybookUpdateWithWhereUniqueWithoutErpInput | PlaybookUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: PlaybookUpdateManyWithWhereWithoutErpInput | PlaybookUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: PlaybookScalarWhereInput | PlaybookScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUncheckedUpdateManyWithoutErpNestedInput = {
    create?: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput> | CompanyCreateWithoutErpInput[] | CompanyUncheckedCreateWithoutErpInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutErpInput | CompanyCreateOrConnectWithoutErpInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutErpInput | CompanyUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: CompanyCreateManyErpInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutErpInput | CompanyUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutErpInput | CompanyUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type EndpointUncheckedUpdateManyWithoutErpNestedInput = {
    create?: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput> | EndpointCreateWithoutErpInput[] | EndpointUncheckedCreateWithoutErpInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutErpInput | EndpointCreateOrConnectWithoutErpInput[]
    upsert?: EndpointUpsertWithWhereUniqueWithoutErpInput | EndpointUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: EndpointCreateManyErpInputEnvelope
    set?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    disconnect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    delete?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    update?: EndpointUpdateWithWhereUniqueWithoutErpInput | EndpointUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: EndpointUpdateManyWithWhereWithoutErpInput | EndpointUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
  }

  export type ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput = {
    create?: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput> | ERPFieldSchemaCreateWithoutErpInput[] | ERPFieldSchemaUncheckedCreateWithoutErpInput[]
    connectOrCreate?: ERPFieldSchemaCreateOrConnectWithoutErpInput | ERPFieldSchemaCreateOrConnectWithoutErpInput[]
    upsert?: ERPFieldSchemaUpsertWithWhereUniqueWithoutErpInput | ERPFieldSchemaUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: ERPFieldSchemaCreateManyErpInputEnvelope
    set?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    disconnect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    delete?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    connect?: ERPFieldSchemaWhereUniqueInput | ERPFieldSchemaWhereUniqueInput[]
    update?: ERPFieldSchemaUpdateWithWhereUniqueWithoutErpInput | ERPFieldSchemaUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: ERPFieldSchemaUpdateManyWithWhereWithoutErpInput | ERPFieldSchemaUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: ERPFieldSchemaScalarWhereInput | ERPFieldSchemaScalarWhereInput[]
  }

  export type PlaybookUncheckedUpdateManyWithoutErpNestedInput = {
    create?: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput> | PlaybookCreateWithoutErpInput[] | PlaybookUncheckedCreateWithoutErpInput[]
    connectOrCreate?: PlaybookCreateOrConnectWithoutErpInput | PlaybookCreateOrConnectWithoutErpInput[]
    upsert?: PlaybookUpsertWithWhereUniqueWithoutErpInput | PlaybookUpsertWithWhereUniqueWithoutErpInput[]
    createMany?: PlaybookCreateManyErpInputEnvelope
    set?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    disconnect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    delete?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    connect?: PlaybookWhereUniqueInput | PlaybookWhereUniqueInput[]
    update?: PlaybookUpdateWithWhereUniqueWithoutErpInput | PlaybookUpdateWithWhereUniqueWithoutErpInput[]
    updateMany?: PlaybookUpdateManyWithWhereWithoutErpInput | PlaybookUpdateManyWithWhereWithoutErpInput[]
    deleteMany?: PlaybookScalarWhereInput | PlaybookScalarWhereInput[]
  }

  export type ERPCreateNestedOneWithoutFieldSchemasInput = {
    create?: XOR<ERPCreateWithoutFieldSchemasInput, ERPUncheckedCreateWithoutFieldSchemasInput>
    connectOrCreate?: ERPCreateOrConnectWithoutFieldSchemasInput
    connect?: ERPWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ERPUpdateOneRequiredWithoutFieldSchemasNestedInput = {
    create?: XOR<ERPCreateWithoutFieldSchemasInput, ERPUncheckedCreateWithoutFieldSchemasInput>
    connectOrCreate?: ERPCreateOrConnectWithoutFieldSchemasInput
    upsert?: ERPUpsertWithoutFieldSchemasInput
    connect?: ERPWhereUniqueInput
    update?: XOR<XOR<ERPUpdateToOneWithWhereWithoutFieldSchemasInput, ERPUpdateWithoutFieldSchemasInput>, ERPUncheckedUpdateWithoutFieldSchemasInput>
  }

  export type ERPCreateNestedOneWithoutEndpointsInput = {
    create?: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ERPCreateOrConnectWithoutEndpointsInput
    connect?: ERPWhereUniqueInput
  }

  export type PlaybookStepCreateNestedManyWithoutEndpointInput = {
    create?: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput> | PlaybookStepCreateWithoutEndpointInput[] | PlaybookStepUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutEndpointInput | PlaybookStepCreateOrConnectWithoutEndpointInput[]
    createMany?: PlaybookStepCreateManyEndpointInputEnvelope
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
  }

  export type PlaybookStepUncheckedCreateNestedManyWithoutEndpointInput = {
    create?: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput> | PlaybookStepCreateWithoutEndpointInput[] | PlaybookStepUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutEndpointInput | PlaybookStepCreateOrConnectWithoutEndpointInput[]
    createMany?: PlaybookStepCreateManyEndpointInputEnvelope
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
  }

  export type ERPUpdateOneRequiredWithoutEndpointsNestedInput = {
    create?: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ERPCreateOrConnectWithoutEndpointsInput
    upsert?: ERPUpsertWithoutEndpointsInput
    connect?: ERPWhereUniqueInput
    update?: XOR<XOR<ERPUpdateToOneWithWhereWithoutEndpointsInput, ERPUpdateWithoutEndpointsInput>, ERPUncheckedUpdateWithoutEndpointsInput>
  }

  export type PlaybookStepUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput> | PlaybookStepCreateWithoutEndpointInput[] | PlaybookStepUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutEndpointInput | PlaybookStepCreateOrConnectWithoutEndpointInput[]
    upsert?: PlaybookStepUpsertWithWhereUniqueWithoutEndpointInput | PlaybookStepUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: PlaybookStepCreateManyEndpointInputEnvelope
    set?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    disconnect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    delete?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    update?: PlaybookStepUpdateWithWhereUniqueWithoutEndpointInput | PlaybookStepUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: PlaybookStepUpdateManyWithWhereWithoutEndpointInput | PlaybookStepUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
  }

  export type PlaybookStepUncheckedUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput> | PlaybookStepCreateWithoutEndpointInput[] | PlaybookStepUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutEndpointInput | PlaybookStepCreateOrConnectWithoutEndpointInput[]
    upsert?: PlaybookStepUpsertWithWhereUniqueWithoutEndpointInput | PlaybookStepUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: PlaybookStepCreateManyEndpointInputEnvelope
    set?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    disconnect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    delete?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    update?: PlaybookStepUpdateWithWhereUniqueWithoutEndpointInput | PlaybookStepUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: PlaybookStepUpdateManyWithWhereWithoutEndpointInput | PlaybookStepUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
  }

  export type ERPCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<ERPCreateWithoutCompaniesInput, ERPUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ERPCreateOrConnectWithoutCompaniesInput
    connect?: ERPWhereUniqueInput
  }

  export type TestClientCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput> | TestClientCreateWithoutCompanyInput[] | TestClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TestClientCreateOrConnectWithoutCompanyInput | TestClientCreateOrConnectWithoutCompanyInput[]
    createMany?: TestClientCreateManyCompanyInputEnvelope
    connect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
  }

  export type PlaybookRunCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput> | PlaybookRunCreateWithoutCompanyInput[] | PlaybookRunUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutCompanyInput | PlaybookRunCreateOrConnectWithoutCompanyInput[]
    createMany?: PlaybookRunCreateManyCompanyInputEnvelope
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
  }

  export type TestClientUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput> | TestClientCreateWithoutCompanyInput[] | TestClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TestClientCreateOrConnectWithoutCompanyInput | TestClientCreateOrConnectWithoutCompanyInput[]
    createMany?: TestClientCreateManyCompanyInputEnvelope
    connect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
  }

  export type PlaybookRunUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput> | PlaybookRunCreateWithoutCompanyInput[] | PlaybookRunUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutCompanyInput | PlaybookRunCreateOrConnectWithoutCompanyInput[]
    createMany?: PlaybookRunCreateManyCompanyInputEnvelope
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
  }

  export type ERPUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<ERPCreateWithoutCompaniesInput, ERPUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ERPCreateOrConnectWithoutCompaniesInput
    upsert?: ERPUpsertWithoutCompaniesInput
    connect?: ERPWhereUniqueInput
    update?: XOR<XOR<ERPUpdateToOneWithWhereWithoutCompaniesInput, ERPUpdateWithoutCompaniesInput>, ERPUncheckedUpdateWithoutCompaniesInput>
  }

  export type TestClientUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput> | TestClientCreateWithoutCompanyInput[] | TestClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TestClientCreateOrConnectWithoutCompanyInput | TestClientCreateOrConnectWithoutCompanyInput[]
    upsert?: TestClientUpsertWithWhereUniqueWithoutCompanyInput | TestClientUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TestClientCreateManyCompanyInputEnvelope
    set?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    disconnect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    delete?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    connect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    update?: TestClientUpdateWithWhereUniqueWithoutCompanyInput | TestClientUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TestClientUpdateManyWithWhereWithoutCompanyInput | TestClientUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TestClientScalarWhereInput | TestClientScalarWhereInput[]
  }

  export type PlaybookRunUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput> | PlaybookRunCreateWithoutCompanyInput[] | PlaybookRunUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutCompanyInput | PlaybookRunCreateOrConnectWithoutCompanyInput[]
    upsert?: PlaybookRunUpsertWithWhereUniqueWithoutCompanyInput | PlaybookRunUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PlaybookRunCreateManyCompanyInputEnvelope
    set?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    disconnect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    delete?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    update?: PlaybookRunUpdateWithWhereUniqueWithoutCompanyInput | PlaybookRunUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PlaybookRunUpdateManyWithWhereWithoutCompanyInput | PlaybookRunUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
  }

  export type TestClientUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput> | TestClientCreateWithoutCompanyInput[] | TestClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TestClientCreateOrConnectWithoutCompanyInput | TestClientCreateOrConnectWithoutCompanyInput[]
    upsert?: TestClientUpsertWithWhereUniqueWithoutCompanyInput | TestClientUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TestClientCreateManyCompanyInputEnvelope
    set?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    disconnect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    delete?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    connect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
    update?: TestClientUpdateWithWhereUniqueWithoutCompanyInput | TestClientUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TestClientUpdateManyWithWhereWithoutCompanyInput | TestClientUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TestClientScalarWhereInput | TestClientScalarWhereInput[]
  }

  export type PlaybookRunUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput> | PlaybookRunCreateWithoutCompanyInput[] | PlaybookRunUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutCompanyInput | PlaybookRunCreateOrConnectWithoutCompanyInput[]
    upsert?: PlaybookRunUpsertWithWhereUniqueWithoutCompanyInput | PlaybookRunUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PlaybookRunCreateManyCompanyInputEnvelope
    set?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    disconnect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    delete?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    update?: PlaybookRunUpdateWithWhereUniqueWithoutCompanyInput | PlaybookRunUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PlaybookRunUpdateManyWithWhereWithoutCompanyInput | PlaybookRunUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutTestClientsInput = {
    create?: XOR<CompanyCreateWithoutTestClientsInput, CompanyUncheckedCreateWithoutTestClientsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTestClientsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutTestClientsNestedInput = {
    create?: XOR<CompanyCreateWithoutTestClientsInput, CompanyUncheckedCreateWithoutTestClientsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTestClientsInput
    upsert?: CompanyUpsertWithoutTestClientsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTestClientsInput, CompanyUpdateWithoutTestClientsInput>, CompanyUncheckedUpdateWithoutTestClientsInput>
  }

  export type EmbeddingChunkCreateNestedManyWithoutCollectionInput = {
    connect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
  }

  export type EmbeddingChunkUncheckedCreateNestedManyWithoutCollectionInput = {
    connect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
  }

  export type EmbeddingChunkUpdateManyWithoutCollectionNestedInput = {
    set?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    disconnect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    delete?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    connect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    update?: EmbeddingChunkUpdateWithWhereUniqueWithoutCollectionInput | EmbeddingChunkUpdateWithWhereUniqueWithoutCollectionInput[]
    updateMany?: EmbeddingChunkUpdateManyWithWhereWithoutCollectionInput | EmbeddingChunkUpdateManyWithWhereWithoutCollectionInput[]
    deleteMany?: EmbeddingChunkScalarWhereInput | EmbeddingChunkScalarWhereInput[]
  }

  export type EmbeddingChunkUncheckedUpdateManyWithoutCollectionNestedInput = {
    set?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    disconnect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    delete?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    connect?: EmbeddingChunkWhereUniqueInput | EmbeddingChunkWhereUniqueInput[]
    update?: EmbeddingChunkUpdateWithWhereUniqueWithoutCollectionInput | EmbeddingChunkUpdateWithWhereUniqueWithoutCollectionInput[]
    updateMany?: EmbeddingChunkUpdateManyWithWhereWithoutCollectionInput | EmbeddingChunkUpdateManyWithWhereWithoutCollectionInput[]
    deleteMany?: EmbeddingChunkScalarWhereInput | EmbeddingChunkScalarWhereInput[]
  }

  export type PostmanCollectionUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<PostmanCollectionCreateWithoutChunksInput, PostmanCollectionUncheckedCreateWithoutChunksInput>
    connectOrCreate?: PostmanCollectionCreateOrConnectWithoutChunksInput
    upsert?: PostmanCollectionUpsertWithoutChunksInput
    connect?: PostmanCollectionWhereUniqueInput
    update?: XOR<XOR<PostmanCollectionUpdateToOneWithWhereWithoutChunksInput, PostmanCollectionUpdateWithoutChunksInput>, PostmanCollectionUncheckedUpdateWithoutChunksInput>
  }

  export type ERPCreateNestedOneWithoutPlaybooksInput = {
    create?: XOR<ERPCreateWithoutPlaybooksInput, ERPUncheckedCreateWithoutPlaybooksInput>
    connectOrCreate?: ERPCreateOrConnectWithoutPlaybooksInput
    connect?: ERPWhereUniqueInput
  }

  export type PlaybookStepCreateNestedManyWithoutPlaybookInput = {
    create?: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput> | PlaybookStepCreateWithoutPlaybookInput[] | PlaybookStepUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutPlaybookInput | PlaybookStepCreateOrConnectWithoutPlaybookInput[]
    createMany?: PlaybookStepCreateManyPlaybookInputEnvelope
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
  }

  export type PlaybookRunCreateNestedManyWithoutPlaybookInput = {
    create?: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput> | PlaybookRunCreateWithoutPlaybookInput[] | PlaybookRunUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutPlaybookInput | PlaybookRunCreateOrConnectWithoutPlaybookInput[]
    createMany?: PlaybookRunCreateManyPlaybookInputEnvelope
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
  }

  export type PlaybookStepUncheckedCreateNestedManyWithoutPlaybookInput = {
    create?: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput> | PlaybookStepCreateWithoutPlaybookInput[] | PlaybookStepUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutPlaybookInput | PlaybookStepCreateOrConnectWithoutPlaybookInput[]
    createMany?: PlaybookStepCreateManyPlaybookInputEnvelope
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
  }

  export type PlaybookRunUncheckedCreateNestedManyWithoutPlaybookInput = {
    create?: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput> | PlaybookRunCreateWithoutPlaybookInput[] | PlaybookRunUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutPlaybookInput | PlaybookRunCreateOrConnectWithoutPlaybookInput[]
    createMany?: PlaybookRunCreateManyPlaybookInputEnvelope
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
  }

  export type ERPUpdateOneRequiredWithoutPlaybooksNestedInput = {
    create?: XOR<ERPCreateWithoutPlaybooksInput, ERPUncheckedCreateWithoutPlaybooksInput>
    connectOrCreate?: ERPCreateOrConnectWithoutPlaybooksInput
    upsert?: ERPUpsertWithoutPlaybooksInput
    connect?: ERPWhereUniqueInput
    update?: XOR<XOR<ERPUpdateToOneWithWhereWithoutPlaybooksInput, ERPUpdateWithoutPlaybooksInput>, ERPUncheckedUpdateWithoutPlaybooksInput>
  }

  export type PlaybookStepUpdateManyWithoutPlaybookNestedInput = {
    create?: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput> | PlaybookStepCreateWithoutPlaybookInput[] | PlaybookStepUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutPlaybookInput | PlaybookStepCreateOrConnectWithoutPlaybookInput[]
    upsert?: PlaybookStepUpsertWithWhereUniqueWithoutPlaybookInput | PlaybookStepUpsertWithWhereUniqueWithoutPlaybookInput[]
    createMany?: PlaybookStepCreateManyPlaybookInputEnvelope
    set?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    disconnect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    delete?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    update?: PlaybookStepUpdateWithWhereUniqueWithoutPlaybookInput | PlaybookStepUpdateWithWhereUniqueWithoutPlaybookInput[]
    updateMany?: PlaybookStepUpdateManyWithWhereWithoutPlaybookInput | PlaybookStepUpdateManyWithWhereWithoutPlaybookInput[]
    deleteMany?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
  }

  export type PlaybookRunUpdateManyWithoutPlaybookNestedInput = {
    create?: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput> | PlaybookRunCreateWithoutPlaybookInput[] | PlaybookRunUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutPlaybookInput | PlaybookRunCreateOrConnectWithoutPlaybookInput[]
    upsert?: PlaybookRunUpsertWithWhereUniqueWithoutPlaybookInput | PlaybookRunUpsertWithWhereUniqueWithoutPlaybookInput[]
    createMany?: PlaybookRunCreateManyPlaybookInputEnvelope
    set?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    disconnect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    delete?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    update?: PlaybookRunUpdateWithWhereUniqueWithoutPlaybookInput | PlaybookRunUpdateWithWhereUniqueWithoutPlaybookInput[]
    updateMany?: PlaybookRunUpdateManyWithWhereWithoutPlaybookInput | PlaybookRunUpdateManyWithWhereWithoutPlaybookInput[]
    deleteMany?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
  }

  export type PlaybookStepUncheckedUpdateManyWithoutPlaybookNestedInput = {
    create?: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput> | PlaybookStepCreateWithoutPlaybookInput[] | PlaybookStepUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookStepCreateOrConnectWithoutPlaybookInput | PlaybookStepCreateOrConnectWithoutPlaybookInput[]
    upsert?: PlaybookStepUpsertWithWhereUniqueWithoutPlaybookInput | PlaybookStepUpsertWithWhereUniqueWithoutPlaybookInput[]
    createMany?: PlaybookStepCreateManyPlaybookInputEnvelope
    set?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    disconnect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    delete?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    connect?: PlaybookStepWhereUniqueInput | PlaybookStepWhereUniqueInput[]
    update?: PlaybookStepUpdateWithWhereUniqueWithoutPlaybookInput | PlaybookStepUpdateWithWhereUniqueWithoutPlaybookInput[]
    updateMany?: PlaybookStepUpdateManyWithWhereWithoutPlaybookInput | PlaybookStepUpdateManyWithWhereWithoutPlaybookInput[]
    deleteMany?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
  }

  export type PlaybookRunUncheckedUpdateManyWithoutPlaybookNestedInput = {
    create?: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput> | PlaybookRunCreateWithoutPlaybookInput[] | PlaybookRunUncheckedCreateWithoutPlaybookInput[]
    connectOrCreate?: PlaybookRunCreateOrConnectWithoutPlaybookInput | PlaybookRunCreateOrConnectWithoutPlaybookInput[]
    upsert?: PlaybookRunUpsertWithWhereUniqueWithoutPlaybookInput | PlaybookRunUpsertWithWhereUniqueWithoutPlaybookInput[]
    createMany?: PlaybookRunCreateManyPlaybookInputEnvelope
    set?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    disconnect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    delete?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    connect?: PlaybookRunWhereUniqueInput | PlaybookRunWhereUniqueInput[]
    update?: PlaybookRunUpdateWithWhereUniqueWithoutPlaybookInput | PlaybookRunUpdateWithWhereUniqueWithoutPlaybookInput[]
    updateMany?: PlaybookRunUpdateManyWithWhereWithoutPlaybookInput | PlaybookRunUpdateManyWithWhereWithoutPlaybookInput[]
    deleteMany?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
  }

  export type PlaybookCreateNestedOneWithoutStepsInput = {
    create?: XOR<PlaybookCreateWithoutStepsInput, PlaybookUncheckedCreateWithoutStepsInput>
    connectOrCreate?: PlaybookCreateOrConnectWithoutStepsInput
    connect?: PlaybookWhereUniqueInput
  }

  export type EndpointCreateNestedOneWithoutPlaybookStepsInput = {
    create?: XOR<EndpointCreateWithoutPlaybookStepsInput, EndpointUncheckedCreateWithoutPlaybookStepsInput>
    connectOrCreate?: EndpointCreateOrConnectWithoutPlaybookStepsInput
    connect?: EndpointWhereUniqueInput
  }

  export type PlaybookUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<PlaybookCreateWithoutStepsInput, PlaybookUncheckedCreateWithoutStepsInput>
    connectOrCreate?: PlaybookCreateOrConnectWithoutStepsInput
    upsert?: PlaybookUpsertWithoutStepsInput
    connect?: PlaybookWhereUniqueInput
    update?: XOR<XOR<PlaybookUpdateToOneWithWhereWithoutStepsInput, PlaybookUpdateWithoutStepsInput>, PlaybookUncheckedUpdateWithoutStepsInput>
  }

  export type EndpointUpdateOneRequiredWithoutPlaybookStepsNestedInput = {
    create?: XOR<EndpointCreateWithoutPlaybookStepsInput, EndpointUncheckedCreateWithoutPlaybookStepsInput>
    connectOrCreate?: EndpointCreateOrConnectWithoutPlaybookStepsInput
    upsert?: EndpointUpsertWithoutPlaybookStepsInput
    connect?: EndpointWhereUniqueInput
    update?: XOR<XOR<EndpointUpdateToOneWithWhereWithoutPlaybookStepsInput, EndpointUpdateWithoutPlaybookStepsInput>, EndpointUncheckedUpdateWithoutPlaybookStepsInput>
  }

  export type PlaybookCreateNestedOneWithoutRunsInput = {
    create?: XOR<PlaybookCreateWithoutRunsInput, PlaybookUncheckedCreateWithoutRunsInput>
    connectOrCreate?: PlaybookCreateOrConnectWithoutRunsInput
    connect?: PlaybookWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutPlaybookRunsInput = {
    create?: XOR<CompanyCreateWithoutPlaybookRunsInput, CompanyUncheckedCreateWithoutPlaybookRunsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPlaybookRunsInput
    connect?: CompanyWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PlaybookUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<PlaybookCreateWithoutRunsInput, PlaybookUncheckedCreateWithoutRunsInput>
    connectOrCreate?: PlaybookCreateOrConnectWithoutRunsInput
    upsert?: PlaybookUpsertWithoutRunsInput
    connect?: PlaybookWhereUniqueInput
    update?: XOR<XOR<PlaybookUpdateToOneWithWhereWithoutRunsInput, PlaybookUpdateWithoutRunsInput>, PlaybookUncheckedUpdateWithoutRunsInput>
  }

  export type CompanyUpdateOneRequiredWithoutPlaybookRunsNestedInput = {
    create?: XOR<CompanyCreateWithoutPlaybookRunsInput, CompanyUncheckedCreateWithoutPlaybookRunsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPlaybookRunsInput
    upsert?: CompanyUpsertWithoutPlaybookRunsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutPlaybookRunsInput, CompanyUpdateWithoutPlaybookRunsInput>, CompanyUncheckedUpdateWithoutPlaybookRunsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CompanyCreateWithoutErpInput = {
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    testClients?: TestClientCreateNestedManyWithoutCompanyInput
    playbookRuns?: PlaybookRunCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutErpInput = {
    id?: number
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    testClients?: TestClientUncheckedCreateNestedManyWithoutCompanyInput
    playbookRuns?: PlaybookRunUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutErpInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput>
  }

  export type CompanyCreateManyErpInputEnvelope = {
    data: CompanyCreateManyErpInput | CompanyCreateManyErpInput[]
    skipDuplicates?: boolean
  }

  export type EndpointCreateWithoutErpInput = {
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
    playbookSteps?: PlaybookStepCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUncheckedCreateWithoutErpInput = {
    id?: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
    playbookSteps?: PlaybookStepUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type EndpointCreateOrConnectWithoutErpInput = {
    where: EndpointWhereUniqueInput
    create: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput>
  }

  export type EndpointCreateManyErpInputEnvelope = {
    data: EndpointCreateManyErpInput | EndpointCreateManyErpInput[]
    skipDuplicates?: boolean
  }

  export type ERPFieldSchemaCreateWithoutErpInput = {
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }

  export type ERPFieldSchemaUncheckedCreateWithoutErpInput = {
    id?: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }

  export type ERPFieldSchemaCreateOrConnectWithoutErpInput = {
    where: ERPFieldSchemaWhereUniqueInput
    create: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput>
  }

  export type ERPFieldSchemaCreateManyErpInputEnvelope = {
    data: ERPFieldSchemaCreateManyErpInput | ERPFieldSchemaCreateManyErpInput[]
    skipDuplicates?: boolean
  }

  export type PlaybookCreateWithoutErpInput = {
    name: string
    description?: string
    createdAt?: Date | string
    steps?: PlaybookStepCreateNestedManyWithoutPlaybookInput
    runs?: PlaybookRunCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookUncheckedCreateWithoutErpInput = {
    id?: number
    name: string
    description?: string
    createdAt?: Date | string
    steps?: PlaybookStepUncheckedCreateNestedManyWithoutPlaybookInput
    runs?: PlaybookRunUncheckedCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookCreateOrConnectWithoutErpInput = {
    where: PlaybookWhereUniqueInput
    create: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput>
  }

  export type PlaybookCreateManyErpInputEnvelope = {
    data: PlaybookCreateManyErpInput | PlaybookCreateManyErpInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithWhereUniqueWithoutErpInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutErpInput, CompanyUncheckedUpdateWithoutErpInput>
    create: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutErpInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutErpInput, CompanyUncheckedUpdateWithoutErpInput>
  }

  export type CompanyUpdateManyWithWhereWithoutErpInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutErpInput>
  }

  export type CompanyScalarWhereInput = {
    AND?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    OR?: CompanyScalarWhereInput[]
    NOT?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    erpId?: IntFilter<"Company"> | number
    baseUrl?: StringFilter<"Company"> | string
    environments?: JsonFilter<"Company">
    authType?: StringFilter<"Company"> | string
    authConfig?: JsonFilter<"Company">
    notes?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
  }

  export type EndpointUpsertWithWhereUniqueWithoutErpInput = {
    where: EndpointWhereUniqueInput
    update: XOR<EndpointUpdateWithoutErpInput, EndpointUncheckedUpdateWithoutErpInput>
    create: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput>
  }

  export type EndpointUpdateWithWhereUniqueWithoutErpInput = {
    where: EndpointWhereUniqueInput
    data: XOR<EndpointUpdateWithoutErpInput, EndpointUncheckedUpdateWithoutErpInput>
  }

  export type EndpointUpdateManyWithWhereWithoutErpInput = {
    where: EndpointScalarWhereInput
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyWithoutErpInput>
  }

  export type EndpointScalarWhereInput = {
    AND?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
    OR?: EndpointScalarWhereInput[]
    NOT?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
    id?: IntFilter<"Endpoint"> | number
    erpId?: IntFilter<"Endpoint"> | number
    name?: StringFilter<"Endpoint"> | string
    method?: StringFilter<"Endpoint"> | string
    pathTemplate?: StringFilter<"Endpoint"> | string
    bodyTemplate?: StringFilter<"Endpoint"> | string
    headers?: StringFilter<"Endpoint"> | string
    sortOrder?: IntFilter<"Endpoint"> | number
    group?: StringFilter<"Endpoint"> | string
    requiresClient?: BoolFilter<"Endpoint"> | boolean
    isModification?: BoolFilter<"Endpoint"> | boolean
    notes?: StringFilter<"Endpoint"> | string
  }

  export type ERPFieldSchemaUpsertWithWhereUniqueWithoutErpInput = {
    where: ERPFieldSchemaWhereUniqueInput
    update: XOR<ERPFieldSchemaUpdateWithoutErpInput, ERPFieldSchemaUncheckedUpdateWithoutErpInput>
    create: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput>
  }

  export type ERPFieldSchemaUpdateWithWhereUniqueWithoutErpInput = {
    where: ERPFieldSchemaWhereUniqueInput
    data: XOR<ERPFieldSchemaUpdateWithoutErpInput, ERPFieldSchemaUncheckedUpdateWithoutErpInput>
  }

  export type ERPFieldSchemaUpdateManyWithWhereWithoutErpInput = {
    where: ERPFieldSchemaScalarWhereInput
    data: XOR<ERPFieldSchemaUpdateManyMutationInput, ERPFieldSchemaUncheckedUpdateManyWithoutErpInput>
  }

  export type ERPFieldSchemaScalarWhereInput = {
    AND?: ERPFieldSchemaScalarWhereInput | ERPFieldSchemaScalarWhereInput[]
    OR?: ERPFieldSchemaScalarWhereInput[]
    NOT?: ERPFieldSchemaScalarWhereInput | ERPFieldSchemaScalarWhereInput[]
    id?: IntFilter<"ERPFieldSchema"> | number
    erpId?: IntFilter<"ERPFieldSchema"> | number
    fieldName?: StringFilter<"ERPFieldSchema"> | string
    label?: StringFilter<"ERPFieldSchema"> | string
    fieldType?: StringFilter<"ERPFieldSchema"> | string
    required?: BoolFilter<"ERPFieldSchema"> | boolean
    sortOrder?: IntFilter<"ERPFieldSchema"> | number
    sourceEndpointId?: IntNullableFilter<"ERPFieldSchema"> | number | null
    endpointParam?: StringFilter<"ERPFieldSchema"> | string
    responsePath?: StringFilter<"ERPFieldSchema"> | string
  }

  export type PlaybookUpsertWithWhereUniqueWithoutErpInput = {
    where: PlaybookWhereUniqueInput
    update: XOR<PlaybookUpdateWithoutErpInput, PlaybookUncheckedUpdateWithoutErpInput>
    create: XOR<PlaybookCreateWithoutErpInput, PlaybookUncheckedCreateWithoutErpInput>
  }

  export type PlaybookUpdateWithWhereUniqueWithoutErpInput = {
    where: PlaybookWhereUniqueInput
    data: XOR<PlaybookUpdateWithoutErpInput, PlaybookUncheckedUpdateWithoutErpInput>
  }

  export type PlaybookUpdateManyWithWhereWithoutErpInput = {
    where: PlaybookScalarWhereInput
    data: XOR<PlaybookUpdateManyMutationInput, PlaybookUncheckedUpdateManyWithoutErpInput>
  }

  export type PlaybookScalarWhereInput = {
    AND?: PlaybookScalarWhereInput | PlaybookScalarWhereInput[]
    OR?: PlaybookScalarWhereInput[]
    NOT?: PlaybookScalarWhereInput | PlaybookScalarWhereInput[]
    id?: IntFilter<"Playbook"> | number
    erpId?: IntFilter<"Playbook"> | number
    name?: StringFilter<"Playbook"> | string
    description?: StringFilter<"Playbook"> | string
    createdAt?: DateTimeFilter<"Playbook"> | Date | string
  }

  export type ERPCreateWithoutFieldSchemasInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    endpoints?: EndpointCreateNestedManyWithoutErpInput
    playbooks?: PlaybookCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutFieldSchemasInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    playbooks?: PlaybookUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutFieldSchemasInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutFieldSchemasInput, ERPUncheckedCreateWithoutFieldSchemasInput>
  }

  export type ERPUpsertWithoutFieldSchemasInput = {
    update: XOR<ERPUpdateWithoutFieldSchemasInput, ERPUncheckedUpdateWithoutFieldSchemasInput>
    create: XOR<ERPCreateWithoutFieldSchemasInput, ERPUncheckedCreateWithoutFieldSchemasInput>
    where?: ERPWhereInput
  }

  export type ERPUpdateToOneWithWhereWithoutFieldSchemasInput = {
    where?: ERPWhereInput
    data: XOR<ERPUpdateWithoutFieldSchemasInput, ERPUncheckedUpdateWithoutFieldSchemasInput>
  }

  export type ERPUpdateWithoutFieldSchemasInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateWithoutFieldSchemasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUncheckedUpdateManyWithoutErpNestedInput
  }

  export type ERPCreateWithoutEndpointsInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
    playbooks?: PlaybookCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutEndpointsInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
    playbooks?: PlaybookUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutEndpointsInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
  }

  export type PlaybookStepCreateWithoutEndpointInput = {
    order: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
    playbook: PlaybookCreateNestedOneWithoutStepsInput
  }

  export type PlaybookStepUncheckedCreateWithoutEndpointInput = {
    id?: number
    playbookId: number
    order: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookStepCreateOrConnectWithoutEndpointInput = {
    where: PlaybookStepWhereUniqueInput
    create: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput>
  }

  export type PlaybookStepCreateManyEndpointInputEnvelope = {
    data: PlaybookStepCreateManyEndpointInput | PlaybookStepCreateManyEndpointInput[]
    skipDuplicates?: boolean
  }

  export type ERPUpsertWithoutEndpointsInput = {
    update: XOR<ERPUpdateWithoutEndpointsInput, ERPUncheckedUpdateWithoutEndpointsInput>
    create: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
    where?: ERPWhereInput
  }

  export type ERPUpdateToOneWithWhereWithoutEndpointsInput = {
    where?: ERPWhereInput
    data: XOR<ERPUpdateWithoutEndpointsInput, ERPUncheckedUpdateWithoutEndpointsInput>
  }

  export type ERPUpdateWithoutEndpointsInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateWithoutEndpointsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUncheckedUpdateManyWithoutErpNestedInput
  }

  export type PlaybookStepUpsertWithWhereUniqueWithoutEndpointInput = {
    where: PlaybookStepWhereUniqueInput
    update: XOR<PlaybookStepUpdateWithoutEndpointInput, PlaybookStepUncheckedUpdateWithoutEndpointInput>
    create: XOR<PlaybookStepCreateWithoutEndpointInput, PlaybookStepUncheckedCreateWithoutEndpointInput>
  }

  export type PlaybookStepUpdateWithWhereUniqueWithoutEndpointInput = {
    where: PlaybookStepWhereUniqueInput
    data: XOR<PlaybookStepUpdateWithoutEndpointInput, PlaybookStepUncheckedUpdateWithoutEndpointInput>
  }

  export type PlaybookStepUpdateManyWithWhereWithoutEndpointInput = {
    where: PlaybookStepScalarWhereInput
    data: XOR<PlaybookStepUpdateManyMutationInput, PlaybookStepUncheckedUpdateManyWithoutEndpointInput>
  }

  export type PlaybookStepScalarWhereInput = {
    AND?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
    OR?: PlaybookStepScalarWhereInput[]
    NOT?: PlaybookStepScalarWhereInput | PlaybookStepScalarWhereInput[]
    id?: IntFilter<"PlaybookStep"> | number
    playbookId?: IntFilter<"PlaybookStep"> | number
    order?: IntFilter<"PlaybookStep"> | number
    endpointId?: IntFilter<"PlaybookStep"> | number
    stepName?: StringFilter<"PlaybookStep"> | string
    bodyOverride?: StringFilter<"PlaybookStep"> | string
    responseCapture?: StringFilter<"PlaybookStep"> | string
  }

  export type ERPCreateWithoutCompaniesInput = {
    name: string
    createdAt?: Date | string
    endpoints?: EndpointCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
    playbooks?: PlaybookCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutCompaniesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
    playbooks?: PlaybookUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutCompaniesInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutCompaniesInput, ERPUncheckedCreateWithoutCompaniesInput>
  }

  export type TestClientCreateWithoutCompanyInput = {
    name: string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TestClientUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TestClientCreateOrConnectWithoutCompanyInput = {
    where: TestClientWhereUniqueInput
    create: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput>
  }

  export type TestClientCreateManyCompanyInputEnvelope = {
    data: TestClientCreateManyCompanyInput | TestClientCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type PlaybookRunCreateWithoutCompanyInput = {
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
    playbook: PlaybookCreateNestedOneWithoutRunsInput
  }

  export type PlaybookRunUncheckedCreateWithoutCompanyInput = {
    id?: number
    playbookId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type PlaybookRunCreateOrConnectWithoutCompanyInput = {
    where: PlaybookRunWhereUniqueInput
    create: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput>
  }

  export type PlaybookRunCreateManyCompanyInputEnvelope = {
    data: PlaybookRunCreateManyCompanyInput | PlaybookRunCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ERPUpsertWithoutCompaniesInput = {
    update: XOR<ERPUpdateWithoutCompaniesInput, ERPUncheckedUpdateWithoutCompaniesInput>
    create: XOR<ERPCreateWithoutCompaniesInput, ERPUncheckedCreateWithoutCompaniesInput>
    where?: ERPWhereInput
  }

  export type ERPUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: ERPWhereInput
    data: XOR<ERPUpdateWithoutCompaniesInput, ERPUncheckedUpdateWithoutCompaniesInput>
  }

  export type ERPUpdateWithoutCompaniesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: EndpointUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
    playbooks?: PlaybookUncheckedUpdateManyWithoutErpNestedInput
  }

  export type TestClientUpsertWithWhereUniqueWithoutCompanyInput = {
    where: TestClientWhereUniqueInput
    update: XOR<TestClientUpdateWithoutCompanyInput, TestClientUncheckedUpdateWithoutCompanyInput>
    create: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput>
  }

  export type TestClientUpdateWithWhereUniqueWithoutCompanyInput = {
    where: TestClientWhereUniqueInput
    data: XOR<TestClientUpdateWithoutCompanyInput, TestClientUncheckedUpdateWithoutCompanyInput>
  }

  export type TestClientUpdateManyWithWhereWithoutCompanyInput = {
    where: TestClientScalarWhereInput
    data: XOR<TestClientUpdateManyMutationInput, TestClientUncheckedUpdateManyWithoutCompanyInput>
  }

  export type TestClientScalarWhereInput = {
    AND?: TestClientScalarWhereInput | TestClientScalarWhereInput[]
    OR?: TestClientScalarWhereInput[]
    NOT?: TestClientScalarWhereInput | TestClientScalarWhereInput[]
    id?: IntFilter<"TestClient"> | number
    name?: StringFilter<"TestClient"> | string
    companyId?: IntFilter<"TestClient"> | number
    fieldsData?: JsonFilter<"TestClient">
    createdAt?: DateTimeFilter<"TestClient"> | Date | string
  }

  export type PlaybookRunUpsertWithWhereUniqueWithoutCompanyInput = {
    where: PlaybookRunWhereUniqueInput
    update: XOR<PlaybookRunUpdateWithoutCompanyInput, PlaybookRunUncheckedUpdateWithoutCompanyInput>
    create: XOR<PlaybookRunCreateWithoutCompanyInput, PlaybookRunUncheckedCreateWithoutCompanyInput>
  }

  export type PlaybookRunUpdateWithWhereUniqueWithoutCompanyInput = {
    where: PlaybookRunWhereUniqueInput
    data: XOR<PlaybookRunUpdateWithoutCompanyInput, PlaybookRunUncheckedUpdateWithoutCompanyInput>
  }

  export type PlaybookRunUpdateManyWithWhereWithoutCompanyInput = {
    where: PlaybookRunScalarWhereInput
    data: XOR<PlaybookRunUpdateManyMutationInput, PlaybookRunUncheckedUpdateManyWithoutCompanyInput>
  }

  export type PlaybookRunScalarWhereInput = {
    AND?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
    OR?: PlaybookRunScalarWhereInput[]
    NOT?: PlaybookRunScalarWhereInput | PlaybookRunScalarWhereInput[]
    id?: IntFilter<"PlaybookRun"> | number
    playbookId?: IntFilter<"PlaybookRun"> | number
    companyId?: IntFilter<"PlaybookRun"> | number
    clientId?: IntNullableFilter<"PlaybookRun"> | number | null
    startedAt?: DateTimeFilter<"PlaybookRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"PlaybookRun"> | Date | string | null
    status?: StringFilter<"PlaybookRun"> | string
    steps?: JsonFilter<"PlaybookRun">
    shareToken?: StringNullableFilter<"PlaybookRun"> | string | null
  }

  export type CompanyCreateWithoutTestClientsInput = {
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutCompaniesInput
    playbookRuns?: PlaybookRunCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutTestClientsInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    playbookRuns?: PlaybookRunUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutTestClientsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTestClientsInput, CompanyUncheckedCreateWithoutTestClientsInput>
  }

  export type CompanyUpsertWithoutTestClientsInput = {
    update: XOR<CompanyUpdateWithoutTestClientsInput, CompanyUncheckedUpdateWithoutTestClientsInput>
    create: XOR<CompanyCreateWithoutTestClientsInput, CompanyUncheckedCreateWithoutTestClientsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTestClientsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTestClientsInput, CompanyUncheckedUpdateWithoutTestClientsInput>
  }

  export type CompanyUpdateWithoutTestClientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutCompaniesNestedInput
    playbookRuns?: PlaybookRunUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTestClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playbookRuns?: PlaybookRunUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type EmbeddingChunkUpdateWithWhereUniqueWithoutCollectionInput = {
    where: EmbeddingChunkWhereUniqueInput
    data: XOR<EmbeddingChunkUpdateWithoutCollectionInput, EmbeddingChunkUncheckedUpdateWithoutCollectionInput>
  }

  export type EmbeddingChunkUpdateManyWithWhereWithoutCollectionInput = {
    where: EmbeddingChunkScalarWhereInput
    data: XOR<EmbeddingChunkUpdateManyMutationInput, EmbeddingChunkUncheckedUpdateManyWithoutCollectionInput>
  }

  export type EmbeddingChunkScalarWhereInput = {
    AND?: EmbeddingChunkScalarWhereInput | EmbeddingChunkScalarWhereInput[]
    OR?: EmbeddingChunkScalarWhereInput[]
    NOT?: EmbeddingChunkScalarWhereInput | EmbeddingChunkScalarWhereInput[]
    id?: IntFilter<"EmbeddingChunk"> | number
    collectionId?: IntFilter<"EmbeddingChunk"> | number
    text?: StringFilter<"EmbeddingChunk"> | string
  }

  export type PostmanCollectionCreateWithoutChunksInput = {
    name: string
    context: string
    systemPrompt?: string
    embeddingProvider?: string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PostmanCollectionUncheckedCreateWithoutChunksInput = {
    id?: number
    name: string
    context: string
    systemPrompt?: string
    embeddingProvider?: string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PostmanCollectionCreateOrConnectWithoutChunksInput = {
    where: PostmanCollectionWhereUniqueInput
    create: XOR<PostmanCollectionCreateWithoutChunksInput, PostmanCollectionUncheckedCreateWithoutChunksInput>
  }

  export type PostmanCollectionUpsertWithoutChunksInput = {
    update: XOR<PostmanCollectionUpdateWithoutChunksInput, PostmanCollectionUncheckedUpdateWithoutChunksInput>
    create: XOR<PostmanCollectionCreateWithoutChunksInput, PostmanCollectionUncheckedCreateWithoutChunksInput>
    where?: PostmanCollectionWhereInput
  }

  export type PostmanCollectionUpdateToOneWithWhereWithoutChunksInput = {
    where?: PostmanCollectionWhereInput
    data: XOR<PostmanCollectionUpdateWithoutChunksInput, PostmanCollectionUncheckedUpdateWithoutChunksInput>
  }

  export type PostmanCollectionUpdateWithoutChunksInput = {
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostmanCollectionUncheckedUpdateWithoutChunksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    context?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    embeddingProvider?: StringFieldUpdateOperationsInput | string
    rawJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ERPCreateWithoutPlaybooksInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    endpoints?: EndpointCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutPlaybooksInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutPlaybooksInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutPlaybooksInput, ERPUncheckedCreateWithoutPlaybooksInput>
  }

  export type PlaybookStepCreateWithoutPlaybookInput = {
    order: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
    endpoint: EndpointCreateNestedOneWithoutPlaybookStepsInput
  }

  export type PlaybookStepUncheckedCreateWithoutPlaybookInput = {
    id?: number
    order: number
    endpointId: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookStepCreateOrConnectWithoutPlaybookInput = {
    where: PlaybookStepWhereUniqueInput
    create: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput>
  }

  export type PlaybookStepCreateManyPlaybookInputEnvelope = {
    data: PlaybookStepCreateManyPlaybookInput | PlaybookStepCreateManyPlaybookInput[]
    skipDuplicates?: boolean
  }

  export type PlaybookRunCreateWithoutPlaybookInput = {
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
    company: CompanyCreateNestedOneWithoutPlaybookRunsInput
  }

  export type PlaybookRunUncheckedCreateWithoutPlaybookInput = {
    id?: number
    companyId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type PlaybookRunCreateOrConnectWithoutPlaybookInput = {
    where: PlaybookRunWhereUniqueInput
    create: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput>
  }

  export type PlaybookRunCreateManyPlaybookInputEnvelope = {
    data: PlaybookRunCreateManyPlaybookInput | PlaybookRunCreateManyPlaybookInput[]
    skipDuplicates?: boolean
  }

  export type ERPUpsertWithoutPlaybooksInput = {
    update: XOR<ERPUpdateWithoutPlaybooksInput, ERPUncheckedUpdateWithoutPlaybooksInput>
    create: XOR<ERPCreateWithoutPlaybooksInput, ERPUncheckedCreateWithoutPlaybooksInput>
    where?: ERPWhereInput
  }

  export type ERPUpdateToOneWithWhereWithoutPlaybooksInput = {
    where?: ERPWhereInput
    data: XOR<ERPUpdateWithoutPlaybooksInput, ERPUncheckedUpdateWithoutPlaybooksInput>
  }

  export type ERPUpdateWithoutPlaybooksInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateWithoutPlaybooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
  }

  export type PlaybookStepUpsertWithWhereUniqueWithoutPlaybookInput = {
    where: PlaybookStepWhereUniqueInput
    update: XOR<PlaybookStepUpdateWithoutPlaybookInput, PlaybookStepUncheckedUpdateWithoutPlaybookInput>
    create: XOR<PlaybookStepCreateWithoutPlaybookInput, PlaybookStepUncheckedCreateWithoutPlaybookInput>
  }

  export type PlaybookStepUpdateWithWhereUniqueWithoutPlaybookInput = {
    where: PlaybookStepWhereUniqueInput
    data: XOR<PlaybookStepUpdateWithoutPlaybookInput, PlaybookStepUncheckedUpdateWithoutPlaybookInput>
  }

  export type PlaybookStepUpdateManyWithWhereWithoutPlaybookInput = {
    where: PlaybookStepScalarWhereInput
    data: XOR<PlaybookStepUpdateManyMutationInput, PlaybookStepUncheckedUpdateManyWithoutPlaybookInput>
  }

  export type PlaybookRunUpsertWithWhereUniqueWithoutPlaybookInput = {
    where: PlaybookRunWhereUniqueInput
    update: XOR<PlaybookRunUpdateWithoutPlaybookInput, PlaybookRunUncheckedUpdateWithoutPlaybookInput>
    create: XOR<PlaybookRunCreateWithoutPlaybookInput, PlaybookRunUncheckedCreateWithoutPlaybookInput>
  }

  export type PlaybookRunUpdateWithWhereUniqueWithoutPlaybookInput = {
    where: PlaybookRunWhereUniqueInput
    data: XOR<PlaybookRunUpdateWithoutPlaybookInput, PlaybookRunUncheckedUpdateWithoutPlaybookInput>
  }

  export type PlaybookRunUpdateManyWithWhereWithoutPlaybookInput = {
    where: PlaybookRunScalarWhereInput
    data: XOR<PlaybookRunUpdateManyMutationInput, PlaybookRunUncheckedUpdateManyWithoutPlaybookInput>
  }

  export type PlaybookCreateWithoutStepsInput = {
    name: string
    description?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutPlaybooksInput
    runs?: PlaybookRunCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookUncheckedCreateWithoutStepsInput = {
    id?: number
    erpId: number
    name: string
    description?: string
    createdAt?: Date | string
    runs?: PlaybookRunUncheckedCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookCreateOrConnectWithoutStepsInput = {
    where: PlaybookWhereUniqueInput
    create: XOR<PlaybookCreateWithoutStepsInput, PlaybookUncheckedCreateWithoutStepsInput>
  }

  export type EndpointCreateWithoutPlaybookStepsInput = {
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
    erp: ERPCreateNestedOneWithoutEndpointsInput
  }

  export type EndpointUncheckedCreateWithoutPlaybookStepsInput = {
    id?: number
    erpId: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
  }

  export type EndpointCreateOrConnectWithoutPlaybookStepsInput = {
    where: EndpointWhereUniqueInput
    create: XOR<EndpointCreateWithoutPlaybookStepsInput, EndpointUncheckedCreateWithoutPlaybookStepsInput>
  }

  export type PlaybookUpsertWithoutStepsInput = {
    update: XOR<PlaybookUpdateWithoutStepsInput, PlaybookUncheckedUpdateWithoutStepsInput>
    create: XOR<PlaybookCreateWithoutStepsInput, PlaybookUncheckedCreateWithoutStepsInput>
    where?: PlaybookWhereInput
  }

  export type PlaybookUpdateToOneWithWhereWithoutStepsInput = {
    where?: PlaybookWhereInput
    data: XOR<PlaybookUpdateWithoutStepsInput, PlaybookUncheckedUpdateWithoutStepsInput>
  }

  export type PlaybookUpdateWithoutStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutPlaybooksNestedInput
    runs?: PlaybookRunUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookUncheckedUpdateWithoutStepsInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: PlaybookRunUncheckedUpdateManyWithoutPlaybookNestedInput
  }

  export type EndpointUpsertWithoutPlaybookStepsInput = {
    update: XOR<EndpointUpdateWithoutPlaybookStepsInput, EndpointUncheckedUpdateWithoutPlaybookStepsInput>
    create: XOR<EndpointCreateWithoutPlaybookStepsInput, EndpointUncheckedCreateWithoutPlaybookStepsInput>
    where?: EndpointWhereInput
  }

  export type EndpointUpdateToOneWithWhereWithoutPlaybookStepsInput = {
    where?: EndpointWhereInput
    data: XOR<EndpointUpdateWithoutPlaybookStepsInput, EndpointUncheckedUpdateWithoutPlaybookStepsInput>
  }

  export type EndpointUpdateWithoutPlaybookStepsInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
    erp?: ERPUpdateOneRequiredWithoutEndpointsNestedInput
  }

  export type EndpointUncheckedUpdateWithoutPlaybookStepsInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookCreateWithoutRunsInput = {
    name: string
    description?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutPlaybooksInput
    steps?: PlaybookStepCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookUncheckedCreateWithoutRunsInput = {
    id?: number
    erpId: number
    name: string
    description?: string
    createdAt?: Date | string
    steps?: PlaybookStepUncheckedCreateNestedManyWithoutPlaybookInput
  }

  export type PlaybookCreateOrConnectWithoutRunsInput = {
    where: PlaybookWhereUniqueInput
    create: XOR<PlaybookCreateWithoutRunsInput, PlaybookUncheckedCreateWithoutRunsInput>
  }

  export type CompanyCreateWithoutPlaybookRunsInput = {
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutCompaniesInput
    testClients?: TestClientCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutPlaybookRunsInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
    testClients?: TestClientUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutPlaybookRunsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutPlaybookRunsInput, CompanyUncheckedCreateWithoutPlaybookRunsInput>
  }

  export type PlaybookUpsertWithoutRunsInput = {
    update: XOR<PlaybookUpdateWithoutRunsInput, PlaybookUncheckedUpdateWithoutRunsInput>
    create: XOR<PlaybookCreateWithoutRunsInput, PlaybookUncheckedCreateWithoutRunsInput>
    where?: PlaybookWhereInput
  }

  export type PlaybookUpdateToOneWithWhereWithoutRunsInput = {
    where?: PlaybookWhereInput
    data: XOR<PlaybookUpdateWithoutRunsInput, PlaybookUncheckedUpdateWithoutRunsInput>
  }

  export type PlaybookUpdateWithoutRunsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutPlaybooksNestedInput
    steps?: PlaybookStepUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookUncheckedUpdateWithoutRunsInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: PlaybookStepUncheckedUpdateManyWithoutPlaybookNestedInput
  }

  export type CompanyUpsertWithoutPlaybookRunsInput = {
    update: XOR<CompanyUpdateWithoutPlaybookRunsInput, CompanyUncheckedUpdateWithoutPlaybookRunsInput>
    create: XOR<CompanyCreateWithoutPlaybookRunsInput, CompanyUncheckedCreateWithoutPlaybookRunsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutPlaybookRunsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutPlaybookRunsInput, CompanyUncheckedUpdateWithoutPlaybookRunsInput>
  }

  export type CompanyUpdateWithoutPlaybookRunsInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutCompaniesNestedInput
    testClients?: TestClientUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutPlaybookRunsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyErpInput = {
    id?: number
    name: string
    baseUrl?: string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: string
    createdAt?: Date | string
  }

  export type EndpointCreateManyErpInput = {
    id?: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    group?: string
    requiresClient?: boolean
    isModification?: boolean
    notes?: string
  }

  export type ERPFieldSchemaCreateManyErpInput = {
    id?: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }

  export type PlaybookCreateManyErpInput = {
    id?: number
    name: string
    description?: string
    createdAt?: Date | string
  }

  export type CompanyUpdateWithoutErpInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUpdateManyWithoutCompanyNestedInput
    playbookRuns?: PlaybookRunUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUncheckedUpdateManyWithoutCompanyNestedInput
    playbookRuns?: PlaybookRunUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    environments?: JsonNullValueInput | InputJsonValue
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: JsonNullValueInput | InputJsonValue
    notes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EndpointUpdateWithoutErpInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
    playbookSteps?: PlaybookStepUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
    playbookSteps?: PlaybookStepUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
    requiresClient?: BoolFieldUpdateOperationsInput | boolean
    isModification?: BoolFieldUpdateOperationsInput | boolean
    notes?: StringFieldUpdateOperationsInput | string
  }

  export type ERPFieldSchemaUpdateWithoutErpInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type ERPFieldSchemaUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type ERPFieldSchemaUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    sourceEndpointId?: NullableIntFieldUpdateOperationsInput | number | null
    endpointParam?: StringFieldUpdateOperationsInput | string
    responsePath?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookUpdateWithoutErpInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: PlaybookStepUpdateManyWithoutPlaybookNestedInput
    runs?: PlaybookRunUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: PlaybookStepUncheckedUpdateManyWithoutPlaybookNestedInput
    runs?: PlaybookRunUncheckedUpdateManyWithoutPlaybookNestedInput
  }

  export type PlaybookUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaybookStepCreateManyEndpointInput = {
    id?: number
    playbookId: number
    order: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookStepUpdateWithoutEndpointInput = {
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
    playbook?: PlaybookUpdateOneRequiredWithoutStepsNestedInput
  }

  export type PlaybookStepUncheckedUpdateWithoutEndpointInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookStepUncheckedUpdateManyWithoutEndpointInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type TestClientCreateManyCompanyInput = {
    id?: number
    name: string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PlaybookRunCreateManyCompanyInput = {
    id?: number
    playbookId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type TestClientUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaybookRunUpdateWithoutCompanyInput = {
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    playbook?: PlaybookUpdateOneRequiredWithoutRunsNestedInput
  }

  export type PlaybookRunUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlaybookRunUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playbookId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmbeddingChunkUpdateWithoutCollectionInput = {
    text?: StringFieldUpdateOperationsInput | string
  }

  export type EmbeddingChunkUncheckedUpdateWithoutCollectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type EmbeddingChunkUncheckedUpdateManyWithoutCollectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookStepCreateManyPlaybookInput = {
    id?: number
    order: number
    endpointId: number
    stepName?: string
    bodyOverride?: string
    responseCapture?: string
  }

  export type PlaybookRunCreateManyPlaybookInput = {
    id?: number
    companyId: number
    clientId?: number | null
    startedAt?: Date | string
    endedAt?: Date | string | null
    status?: string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: string | null
  }

  export type PlaybookStepUpdateWithoutPlaybookInput = {
    order?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
    endpoint?: EndpointUpdateOneRequiredWithoutPlaybookStepsNestedInput
  }

  export type PlaybookStepUncheckedUpdateWithoutPlaybookInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    endpointId?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookStepUncheckedUpdateManyWithoutPlaybookInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    endpointId?: IntFieldUpdateOperationsInput | number
    stepName?: StringFieldUpdateOperationsInput | string
    bodyOverride?: StringFieldUpdateOperationsInput | string
    responseCapture?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybookRunUpdateWithoutPlaybookInput = {
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutPlaybookRunsNestedInput
  }

  export type PlaybookRunUncheckedUpdateWithoutPlaybookInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlaybookRunUncheckedUpdateManyWithoutPlaybookInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}