
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
      modelProps: "eRP" | "eRPFieldSchema" | "endpoint" | "company" | "testClient" | "requestHistory"
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
  }

  export type ERPCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | ERPCountOutputTypeCountCompaniesArgs
    endpoints?: boolean | ERPCountOutputTypeCountEndpointsArgs
    fieldSchemas?: boolean | ERPCountOutputTypeCountFieldSchemasArgs
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
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    testClients: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testClients?: boolean | CompanyCountOutputTypeCountTestClientsArgs
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
  }

  export type ERPFieldSchemaSumAggregateOutputType = {
    id: number | null
    erpId: number | null
    sortOrder: number | null
  }

  export type ERPFieldSchemaMinAggregateOutputType = {
    id: number | null
    erpId: number | null
    fieldName: string | null
    label: string | null
    fieldType: string | null
    required: boolean | null
    sortOrder: number | null
  }

  export type ERPFieldSchemaMaxAggregateOutputType = {
    id: number | null
    erpId: number | null
    fieldName: string | null
    label: string | null
    fieldType: string | null
    required: boolean | null
    sortOrder: number | null
  }

  export type ERPFieldSchemaCountAggregateOutputType = {
    id: number
    erpId: number
    fieldName: number
    label: number
    fieldType: number
    required: number
    sortOrder: number
    _all: number
  }


  export type ERPFieldSchemaAvgAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
  }

  export type ERPFieldSchemaSumAggregateInputType = {
    id?: true
    erpId?: true
    sortOrder?: true
  }

  export type ERPFieldSchemaMinAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
  }

  export type ERPFieldSchemaMaxAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
  }

  export type ERPFieldSchemaCountAggregateInputType = {
    id?: true
    erpId?: true
    fieldName?: true
    label?: true
    fieldType?: true
    required?: true
    sortOrder?: true
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
  }

  export type ERPFieldSchemaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpId" | "fieldName" | "label" | "fieldType" | "required" | "sortOrder", ExtArgs["result"]["eRPFieldSchema"]>
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
    erp?: boolean | ERPDefaultArgs<ExtArgs>
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
  }

  export type EndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "erpId" | "name" | "method" | "pathTemplate" | "bodyTemplate" | "headers" | "sortOrder", ExtArgs["result"]["endpoint"]>
  export type EndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
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
    authConfig: string | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    erpId: number | null
    baseUrl: string | null
    authType: string | null
    authConfig: string | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    erpId: number
    baseUrl: number
    authType: number
    authConfig: number
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
    authConfig?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    erpId?: true
    baseUrl?: true
    authType?: true
    authConfig?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    erpId?: true
    baseUrl?: true
    authType?: true
    authConfig?: true
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
    authType: string
    authConfig: string
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
    authType?: boolean
    authConfig?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    testClients?: boolean | Company$testClientsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    authType?: boolean
    authConfig?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    authType?: boolean
    authConfig?: boolean
    createdAt?: boolean
    erp?: boolean | ERPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    erpId?: boolean
    baseUrl?: boolean
    authType?: boolean
    authConfig?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "erpId" | "baseUrl" | "authType" | "authConfig" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    erp?: boolean | ERPDefaultArgs<ExtArgs>
    testClients?: boolean | Company$testClientsArgs<ExtArgs>
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
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      erpId: number
      baseUrl: string
      authType: string
      authConfig: string
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
    readonly authType: FieldRef<"Company", 'String'>
    readonly authConfig: FieldRef<"Company", 'String'>
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
    fieldsData: string | null
    createdAt: Date | null
  }

  export type TestClientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    companyId: number | null
    fieldsData: string | null
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
    fieldsData?: true
    createdAt?: true
  }

  export type TestClientMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    fieldsData?: true
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
    fieldsData: string
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
      fieldsData: string
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
    readonly fieldsData: FieldRef<"TestClient", 'String'>
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
    sortOrder: 'sortOrder'
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
    sortOrder: 'sortOrder'
  };

  export type EndpointScalarFieldEnum = (typeof EndpointScalarFieldEnum)[keyof typeof EndpointScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    erpId: 'erpId',
    baseUrl: 'baseUrl',
    authType: 'authType',
    authConfig: 'authConfig',
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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
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
  }

  export type ERPOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    companies?: CompanyOrderByRelationAggregateInput
    endpoints?: EndpointOrderByRelationAggregateInput
    fieldSchemas?: ERPFieldSchemaOrderByRelationAggregateInput
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
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
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
    erp?: ERPOrderByWithRelationInput
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
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
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
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    erpId?: IntFilter<"Company"> | number
    baseUrl?: StringFilter<"Company"> | string
    authType?: StringFilter<"Company"> | string
    authConfig?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    testClients?: TestClientListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
    createdAt?: SortOrder
    erp?: ERPOrderByWithRelationInput
    testClients?: TestClientOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    erpId?: IntFilter<"Company"> | number
    baseUrl?: StringFilter<"Company"> | string
    authType?: StringFilter<"Company"> | string
    authConfig?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    erp?: XOR<ERPScalarRelationFilter, ERPWhereInput>
    testClients?: TestClientListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
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
    authType?: StringWithAggregatesFilter<"Company"> | string
    authConfig?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type TestClientWhereInput = {
    AND?: TestClientWhereInput | TestClientWhereInput[]
    OR?: TestClientWhereInput[]
    NOT?: TestClientWhereInput | TestClientWhereInput[]
    id?: IntFilter<"TestClient"> | number
    name?: StringFilter<"TestClient"> | string
    companyId?: IntFilter<"TestClient"> | number
    fieldsData?: StringFilter<"TestClient"> | string
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
    fieldsData?: StringFilter<"TestClient"> | string
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
    fieldsData?: StringWithAggregatesFilter<"TestClient"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TestClient"> | Date | string
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
  }

  export type ERPUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUpdateManyWithoutErpNestedInput
  }

  export type ERPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
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
  }

  export type ERPFieldSchemaUpdateInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
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
  }

  export type ERPFieldSchemaCreateManyInput = {
    id?: number
    erpId: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
  }

  export type ERPFieldSchemaUpdateManyMutationInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ERPFieldSchemaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    erpId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type EndpointCreateInput = {
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
    erp: ERPCreateNestedOneWithoutEndpointsInput
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
  }

  export type EndpointUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    erp?: ERPUpdateOneRequiredWithoutEndpointsNestedInput
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
  }

  export type EndpointUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
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
  }

  export type CompanyCreateInput = {
    name: string
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutCompaniesInput
    testClients?: TestClientCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
    testClients?: TestClientUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutCompaniesNestedInput
    testClients?: TestClientUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientCreateInput = {
    name: string
    fieldsData?: string
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutTestClientsInput
  }

  export type TestClientUncheckedCreateInput = {
    id?: number
    name: string
    companyId: number
    fieldsData?: string
    createdAt?: Date | string
  }

  export type TestClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTestClientsNestedInput
  }

  export type TestClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientCreateManyInput = {
    id?: number
    name: string
    companyId: number
    fieldsData?: string
    createdAt?: Date | string
  }

  export type TestClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    fieldsData?: StringFieldUpdateOperationsInput | string
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
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

  export type CompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ERPFieldSchemaOrderByRelationAggregateInput = {
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
    in?: number[]
    notIn?: number[]
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
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
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

  export type ERPScalarRelationFilter = {
    is?: ERPWhereInput
    isNot?: ERPWhereInput
  }

  export type ERPFieldSchemaCountOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type ERPFieldSchemaAvgOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ERPFieldSchemaMaxOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type ERPFieldSchemaMinOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    fieldName?: SortOrder
    label?: SortOrder
    fieldType?: SortOrder
    required?: SortOrder
    sortOrder?: SortOrder
  }

  export type ERPFieldSchemaSumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  }

  export type EndpointSumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
    sortOrder?: SortOrder
  }

  export type TestClientListRelationFilter = {
    every?: TestClientWhereInput
    some?: TestClientWhereInput
    none?: TestClientWhereInput
  }

  export type TestClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
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
    authConfig?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    erpId?: SortOrder
    baseUrl?: SortOrder
    authType?: SortOrder
    authConfig?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
    erpId?: SortOrder
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
    fieldsData?: SortOrder
    createdAt?: SortOrder
  }

  export type TestClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    fieldsData?: SortOrder
    createdAt?: SortOrder
  }

  export type TestClientSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type ERPCreateNestedOneWithoutFieldSchemasInput = {
    create?: XOR<ERPCreateWithoutFieldSchemasInput, ERPUncheckedCreateWithoutFieldSchemasInput>
    connectOrCreate?: ERPCreateOrConnectWithoutFieldSchemasInput
    connect?: ERPWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type ERPUpdateOneRequiredWithoutEndpointsNestedInput = {
    create?: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ERPCreateOrConnectWithoutEndpointsInput
    upsert?: ERPUpsertWithoutEndpointsInput
    connect?: ERPWhereUniqueInput
    update?: XOR<XOR<ERPUpdateToOneWithWhereWithoutEndpointsInput, ERPUpdateWithoutEndpointsInput>, ERPUncheckedUpdateWithoutEndpointsInput>
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

  export type TestClientUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput> | TestClientCreateWithoutCompanyInput[] | TestClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TestClientCreateOrConnectWithoutCompanyInput | TestClientCreateOrConnectWithoutCompanyInput[]
    createMany?: TestClientCreateManyCompanyInputEnvelope
    connect?: TestClientWhereUniqueInput | TestClientWhereUniqueInput[]
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

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CompanyCreateWithoutErpInput = {
    name: string
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
    testClients?: TestClientCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutErpInput = {
    id?: number
    name: string
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
    testClients?: TestClientUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutErpInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutErpInput, CompanyUncheckedCreateWithoutErpInput>
  }

  export type CompanyCreateManyErpInputEnvelope = {
    data: CompanyCreateManyErpInput | CompanyCreateManyErpInput[]
  }

  export type EndpointCreateWithoutErpInput = {
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
  }

  export type EndpointUncheckedCreateWithoutErpInput = {
    id?: number
    name: string
    method?: string
    pathTemplate: string
    bodyTemplate?: string
    headers?: string
    sortOrder?: number
  }

  export type EndpointCreateOrConnectWithoutErpInput = {
    where: EndpointWhereUniqueInput
    create: XOR<EndpointCreateWithoutErpInput, EndpointUncheckedCreateWithoutErpInput>
  }

  export type EndpointCreateManyErpInputEnvelope = {
    data: EndpointCreateManyErpInput | EndpointCreateManyErpInput[]
  }

  export type ERPFieldSchemaCreateWithoutErpInput = {
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
  }

  export type ERPFieldSchemaUncheckedCreateWithoutErpInput = {
    id?: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
  }

  export type ERPFieldSchemaCreateOrConnectWithoutErpInput = {
    where: ERPFieldSchemaWhereUniqueInput
    create: XOR<ERPFieldSchemaCreateWithoutErpInput, ERPFieldSchemaUncheckedCreateWithoutErpInput>
  }

  export type ERPFieldSchemaCreateManyErpInputEnvelope = {
    data: ERPFieldSchemaCreateManyErpInput | ERPFieldSchemaCreateManyErpInput[]
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
    authType?: StringFilter<"Company"> | string
    authConfig?: StringFilter<"Company"> | string
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
  }

  export type ERPCreateWithoutFieldSchemasInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    endpoints?: EndpointCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutFieldSchemasInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
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
  }

  export type ERPUncheckedUpdateWithoutFieldSchemasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
  }

  export type ERPCreateWithoutEndpointsInput = {
    name: string
    createdAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutEndpointsInput = {
    id?: number
    name: string
    createdAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutEndpointsInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutEndpointsInput, ERPUncheckedCreateWithoutEndpointsInput>
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
  }

  export type ERPUncheckedUpdateWithoutEndpointsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
  }

  export type ERPCreateWithoutCompaniesInput = {
    name: string
    createdAt?: Date | string
    endpoints?: EndpointCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaCreateNestedManyWithoutErpInput
  }

  export type ERPUncheckedCreateWithoutCompaniesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    endpoints?: EndpointUncheckedCreateNestedManyWithoutErpInput
    fieldSchemas?: ERPFieldSchemaUncheckedCreateNestedManyWithoutErpInput
  }

  export type ERPCreateOrConnectWithoutCompaniesInput = {
    where: ERPWhereUniqueInput
    create: XOR<ERPCreateWithoutCompaniesInput, ERPUncheckedCreateWithoutCompaniesInput>
  }

  export type TestClientCreateWithoutCompanyInput = {
    name: string
    fieldsData?: string
    createdAt?: Date | string
  }

  export type TestClientUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    fieldsData?: string
    createdAt?: Date | string
  }

  export type TestClientCreateOrConnectWithoutCompanyInput = {
    where: TestClientWhereUniqueInput
    create: XOR<TestClientCreateWithoutCompanyInput, TestClientUncheckedCreateWithoutCompanyInput>
  }

  export type TestClientCreateManyCompanyInputEnvelope = {
    data: TestClientCreateManyCompanyInput | TestClientCreateManyCompanyInput[]
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
  }

  export type ERPUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: EndpointUncheckedUpdateManyWithoutErpNestedInput
    fieldSchemas?: ERPFieldSchemaUncheckedUpdateManyWithoutErpNestedInput
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
    fieldsData?: StringFilter<"TestClient"> | string
    createdAt?: DateTimeFilter<"TestClient"> | Date | string
  }

  export type CompanyCreateWithoutTestClientsInput = {
    name: string
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
    erp: ERPCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyUncheckedCreateWithoutTestClientsInput = {
    id?: number
    name: string
    erpId: number
    baseUrl?: string
    authType?: string
    authConfig?: string
    createdAt?: Date | string
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
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    erp?: ERPUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTestClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    erpId?: IntFieldUpdateOperationsInput | number
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateManyErpInput = {
    id?: number
    name: string
    baseUrl?: string
    authType?: string
    authConfig?: string
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
  }

  export type ERPFieldSchemaCreateManyErpInput = {
    id?: number
    fieldName: string
    label: string
    fieldType?: string
    required?: boolean
    sortOrder?: number
  }

  export type CompanyUpdateWithoutErpInput = {
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testClients?: TestClientUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    authConfig?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EndpointUpdateWithoutErpInput = {
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type EndpointUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type EndpointUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    pathTemplate?: StringFieldUpdateOperationsInput | string
    bodyTemplate?: StringFieldUpdateOperationsInput | string
    headers?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ERPFieldSchemaUpdateWithoutErpInput = {
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ERPFieldSchemaUncheckedUpdateWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ERPFieldSchemaUncheckedUpdateManyWithoutErpInput = {
    id?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    fieldType?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TestClientCreateManyCompanyInput = {
    id?: number
    name: string
    fieldsData?: string
    createdAt?: Date | string
  }

  export type TestClientUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestClientUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fieldsData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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