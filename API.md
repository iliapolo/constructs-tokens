# API Reference

**Classes**

Name|Description
----|-----------
[DefaultTokenResolver](#iliapolo-constructs-tokens-defaulttokenresolver)|Default resolver implementation.
[Lazy](#iliapolo-constructs-tokens-lazy)|Lazily produce a value.
[StringConcat](#iliapolo-constructs-tokens-stringconcat)|Converts all fragments to strings and concats those.
[Token](#iliapolo-constructs-tokens-token)|Represents a special or lazily-evaluated value.
[Tokenization](#iliapolo-constructs-tokens-tokenization)|Less oft-needed functions to manipulate Tokens.
[TokenizedStringFragments](#iliapolo-constructs-tokens-tokenizedstringfragments)|Fragments of a concatenated string containing stringified Tokens.


**Structs**

Name|Description
----|-----------
[EncodingOptions](#iliapolo-constructs-tokens-encodingoptions)|Properties to string encodings.
[LazyAnyValueOptions](#iliapolo-constructs-tokens-lazyanyvalueoptions)|Options for creating lazy untyped tokens.
[LazyListValueOptions](#iliapolo-constructs-tokens-lazylistvalueoptions)|Options for creating a lazy list token.
[LazyStringValueOptions](#iliapolo-constructs-tokens-lazystringvalueoptions)|Options for creating a lazy string token.
[ResolveOptions](#iliapolo-constructs-tokens-resolveoptions)|Options to the resolve() operation.


**Interfaces**

Name|Description
----|-----------
[IAnyProducer](#iliapolo-constructs-tokens-ianyproducer)|Interface for lazy untyped value producers.
[IFragmentConcatenator](#iliapolo-constructs-tokens-ifragmentconcatenator)|Function used to concatenate symbols in the target document language.
[IListProducer](#iliapolo-constructs-tokens-ilistproducer)|Interface for lazy list producers.
[INumberProducer](#iliapolo-constructs-tokens-inumberproducer)|Interface for lazy number producers.
[IPostProcessor](#iliapolo-constructs-tokens-ipostprocessor)|A Token that can post-process the complete resolved value, after resolve() has recursed over it.
[IResolvable](#iliapolo-constructs-tokens-iresolvable)|Interface for values that can be resolvable later.
[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)|Current resolution context for tokens.
[IStringProducer](#iliapolo-constructs-tokens-istringproducer)|Interface for lazy string producers.
[ITokenMapper](#iliapolo-constructs-tokens-itokenmapper)|Interface to apply operation to tokens in a string.
[ITokenResolver](#iliapolo-constructs-tokens-itokenresolver)|How to resolve tokens.



## class DefaultTokenResolver 🔹 <a id="iliapolo-constructs-tokens-defaulttokenresolver"></a>

Default resolver implementation.

__Implements__: [ITokenResolver](#iliapolo-constructs-tokens-itokenresolver)

### Initializer




```ts
new DefaultTokenResolver(concat: IFragmentConcatenator)
```

* **concat** (<code>[IFragmentConcatenator](#iliapolo-constructs-tokens-ifragmentconcatenator)</code>)  *No description*


### Methods


#### resolveList(xs, context)🔹 <a id="iliapolo-constructs-tokens-defaulttokenresolver-resolvelist"></a>

Resolve a tokenized list.

```ts
resolveList(xs: Array<string>, context: IResolveContext): any
```

* **xs** (<code>Array<string></code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>

#### resolveString(fragments, context)🔹 <a id="iliapolo-constructs-tokens-defaulttokenresolver-resolvestring"></a>

Resolve string fragments to Tokens.

```ts
resolveString(fragments: TokenizedStringFragments, context: IResolveContext): any
```

* **fragments** (<code>[TokenizedStringFragments](#iliapolo-constructs-tokens-tokenizedstringfragments)</code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>

#### resolveToken(t, context, postProcessor)🔹 <a id="iliapolo-constructs-tokens-defaulttokenresolver-resolvetoken"></a>

Default Token resolution.

Resolve the Token, recurse into whatever it returns,
then finally post-process it.

```ts
resolveToken(t: IResolvable, context: IResolveContext, postProcessor: IPostProcessor): any
```

* **t** (<code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*
* **postProcessor** (<code>[IPostProcessor](#iliapolo-constructs-tokens-ipostprocessor)</code>)  *No description*

__Returns__:
* <code>any</code>



## class Lazy  <a id="iliapolo-constructs-tokens-lazy"></a>

Lazily produce a value.

Can be used to return a string, list or numeric value whose actual value
will only be calculated later, during synthesis.


### Methods


#### *static* anyValue(producer, options?) <a id="iliapolo-constructs-tokens-lazy-anyvalue"></a>

Produces a lazy token from an untyped value.

```ts
static anyValue(producer: IAnyProducer, options?: LazyAnyValueOptions): IResolvable
```

* **producer** (<code>[IAnyProducer](#iliapolo-constructs-tokens-ianyproducer)</code>)  The lazy producer.
* **options** (<code>[LazyAnyValueOptions](#iliapolo-constructs-tokens-lazyanyvalueoptions)</code>)  Options.
  * **displayHint** (<code>string</code>)  Use the given name as a display hint. __*Default*__: No hint
  * **omitEmptyArray** (<code>boolean</code>)  If the produced value is an array and it is empty, return 'undefined' instead. __*Default*__: false

__Returns__:
* <code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>

#### *static* listValue(producer, options?) <a id="iliapolo-constructs-tokens-lazy-listvalue"></a>

Returns a list-ified token for a lazy value.

```ts
static listValue(producer: IListProducer, options?: LazyListValueOptions): Array<string>
```

* **producer** (<code>[IListProducer](#iliapolo-constructs-tokens-ilistproducer)</code>)  The producer.
* **options** (<code>[LazyListValueOptions](#iliapolo-constructs-tokens-lazylistvalueoptions)</code>)  Options.
  * **displayHint** (<code>string</code>)  Use the given name as a display hint. __*Default*__: No hint
  * **omitEmpty** (<code>boolean</code>)  If the produced list is empty, return 'undefined' instead. __*Default*__: false

__Returns__:
* <code>Array<string></code>

#### *static* numberValue(producer) <a id="iliapolo-constructs-tokens-lazy-numbervalue"></a>

Returns a numberified token for a lazy value.

```ts
static numberValue(producer: INumberProducer): number
```

* **producer** (<code>[INumberProducer](#iliapolo-constructs-tokens-inumberproducer)</code>)  The producer.

__Returns__:
* <code>number</code>

#### *static* stringValue(producer, options?) <a id="iliapolo-constructs-tokens-lazy-stringvalue"></a>

Returns a stringified token for a lazy value.

```ts
static stringValue(producer: IStringProducer, options?: LazyStringValueOptions): string
```

* **producer** (<code>[IStringProducer](#iliapolo-constructs-tokens-istringproducer)</code>)  The producer.
* **options** (<code>[LazyStringValueOptions](#iliapolo-constructs-tokens-lazystringvalueoptions)</code>)  Options.
  * **displayHint** (<code>string</code>)  Use the given name as a display hint. __*Default*__: No hint

__Returns__:
* <code>string</code>



## class StringConcat  <a id="iliapolo-constructs-tokens-stringconcat"></a>

Converts all fragments to strings and concats those.

Drops 'undefined's.

__Implements__: [IFragmentConcatenator](#iliapolo-constructs-tokens-ifragmentconcatenator)

### Initializer




```ts
new StringConcat()
```



### Methods


#### join(left, right) <a id="iliapolo-constructs-tokens-stringconcat-join"></a>

Join the fragment on the left and on the right.

```ts
join(left: any, right: any): any
```

* **left** (<code>any</code>)  *No description*
* **right** (<code>any</code>)  *No description*

__Returns__:
* <code>any</code>



## class Token  <a id="iliapolo-constructs-tokens-token"></a>

Represents a special or lazily-evaluated value.

Can be used to delay evaluation of a certain value in case, for example,
that it requires some context or late-bound data. Can also be used to
mark values that need special processing at document rendering time.

Tokens can be embedded into strings while retaining their original
semantics.


### Methods


#### *static* asAny(value) <a id="iliapolo-constructs-tokens-token-asany"></a>

Return a resolvable representation of the given value.

```ts
static asAny(value: any): IResolvable
```

* **value** (<code>any</code>)  *No description*

__Returns__:
* <code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>

#### *static* asList(value, options?) <a id="iliapolo-constructs-tokens-token-aslist"></a>

Return a reversible list representation of this token.

```ts
static asList(value: any, options?: EncodingOptions): Array<string>
```

* **value** (<code>any</code>)  *No description*
* **options** (<code>[EncodingOptions](#iliapolo-constructs-tokens-encodingoptions)</code>)  *No description*
  * **displayHint** (<code>string</code>)  A hint for the Token's purpose when stringifying it. __*Default*__: no display hint

__Returns__:
* <code>Array<string></code>

#### *static* asNumber(value) <a id="iliapolo-constructs-tokens-token-asnumber"></a>

Return a reversible number representation of this token.

```ts
static asNumber(value: any): number
```

* **value** (<code>any</code>)  *No description*

__Returns__:
* <code>number</code>

#### *static* asString(value, options?) <a id="iliapolo-constructs-tokens-token-asstring"></a>

Return a reversible string representation of this token.

If the Token is initialized with a literal, the stringified value of the
literal is returned. Otherwise, a special quoted string representation
of the Token is returned that can be embedded into other strings.

Strings with quoted Tokens in them can be restored back into
complex values with the Tokens restored by calling `resolve()`
on the string.

```ts
static asString(value: any, options?: EncodingOptions): string
```

* **value** (<code>any</code>)  *No description*
* **options** (<code>[EncodingOptions](#iliapolo-constructs-tokens-encodingoptions)</code>)  *No description*
  * **displayHint** (<code>string</code>)  A hint for the Token's purpose when stringifying it. __*Default*__: no display hint

__Returns__:
* <code>string</code>

#### *static* isUnresolved(obj) <a id="iliapolo-constructs-tokens-token-isunresolved"></a>

Returns true if obj represents an unresolved value.

One of these must be true:

- `obj` is an IResolvable
- `obj` is a string containing at least one encoded `IResolvable`
- `obj` is either an encoded number or list

This does NOT recurse into lists or objects to see if they
containing resolvables.

```ts
static isUnresolved(obj: any): boolean
```

* **obj** (<code>any</code>)  The object to test.

__Returns__:
* <code>boolean</code>



## class Tokenization  <a id="iliapolo-constructs-tokens-tokenization"></a>

Less oft-needed functions to manipulate Tokens.


### Methods


#### *static* isResolvable(obj) <a id="iliapolo-constructs-tokens-tokenization-isresolvable"></a>

Return whether the given object is an IResolvable object.

This is different from Token.isUnresolved() which will also check for
encoded Tokens, whereas this method will only do a type check on the given
object.

```ts
static isResolvable(obj: any): boolean
```

* **obj** (<code>any</code>)  *No description*

__Returns__:
* <code>boolean</code>

#### *static* resolve(obj, options) <a id="iliapolo-constructs-tokens-tokenization-resolve"></a>

Resolves an object by evaluating all tokens and removing any undefined or empty objects or arrays.

Values can only be primitives, arrays or tokens. Other objects (i.e. with methods) will be rejected.

```ts
static resolve(obj: any, options: ResolveOptions): any
```

* **obj** (<code>any</code>)  The object to resolve.
* **options** (<code>[ResolveOptions](#iliapolo-constructs-tokens-resolveoptions)</code>)  Prefix key path components for diagnostics.
  * **resolver** (<code>[ITokenResolver](#iliapolo-constructs-tokens-itokenresolver)</code>)  The resolver to apply to any resolvable tokens found. 
  * **scope** (<code>[IConstruct](#constructs-iconstruct)</code>)  The scope from which resolution is performed. 
  * **preparing** (<code>boolean</code>)  Whether the resolution is being executed during the prepare phase or not. __*Default*__: false

__Returns__:
* <code>any</code>

#### *static* reverseList(l) <a id="iliapolo-constructs-tokens-tokenization-reverselist"></a>

Un-encode a Tokenized value from a list.

```ts
static reverseList(l: Array<string>): IResolvable
```

* **l** (<code>Array<string></code>)  *No description*

__Returns__:
* <code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>

#### *static* reverseNumber(n) <a id="iliapolo-constructs-tokens-tokenization-reversenumber"></a>

Un-encode a Tokenized value from a number.

```ts
static reverseNumber(n: number): IResolvable
```

* **n** (<code>number</code>)  *No description*

__Returns__:
* <code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>

#### *static* reverseString(s) <a id="iliapolo-constructs-tokens-tokenization-reversestring"></a>

Un-encode a string potentially containing encoded tokens.

```ts
static reverseString(s: string): TokenizedStringFragments
```

* **s** (<code>string</code>)  *No description*

__Returns__:
* <code>[TokenizedStringFragments](#iliapolo-constructs-tokens-tokenizedstringfragments)</code>

#### *static* stringifyNumber(x) <a id="iliapolo-constructs-tokens-tokenization-stringifynumber"></a>

Stringify a number directly or lazily if it's a Token.

If it is an object (i.e., { Ref: 'SomeLogicalId' }), return it as-is.

```ts
static stringifyNumber(x: number): string
```

* **x** (<code>number</code>)  *No description*

__Returns__:
* <code>string</code>



## class TokenizedStringFragments 🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments"></a>

Fragments of a concatenated string containing stringified Tokens.


### Initializer




```ts
new TokenizedStringFragments()
```




### Properties


Name | Type | Description 
-----|------|-------------
**firstValue**🔹 | <code>any</code> | Returns the first value.
**length**🔹 | <code>number</code> | Returns the number of fragments.
**tokens**🔹 | <code>Array<[IResolvable](#iliapolo-constructs-tokens-iresolvable)></code> | Return all Tokens from this string.
**firstToken**?🔹 | <code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code> | Returns the first token.<br/>__*Optional*__

### Methods


#### addIntrinsic(value)🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments-addintrinsic"></a>

Adds an intrinsic fragment.

```ts
addIntrinsic(value: any): void
```

* **value** (<code>any</code>)  the intrinsic value to add.




#### addLiteral(lit)🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments-addliteral"></a>

Adds a literal fragment.

```ts
addLiteral(lit: any): void
```

* **lit** (<code>any</code>)  the literal to add.




#### addToken(token)🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments-addtoken"></a>

Adds a token fragment.

```ts
addToken(token: IResolvable): void
```

* **token** (<code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>)  the token to add.




#### join(concat)🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments-join"></a>

Combine the string fragments using the given joiner.

If there are any

```ts
join(concat: IFragmentConcatenator): any
```

* **concat** (<code>[IFragmentConcatenator](#iliapolo-constructs-tokens-ifragmentconcatenator)</code>)  *No description*

__Returns__:
* <code>any</code>

#### mapTokens(mapper)🔹 <a id="iliapolo-constructs-tokens-tokenizedstringfragments-maptokens"></a>

Apply a transformation function to all tokens in the string.

```ts
mapTokens(mapper: ITokenMapper): TokenizedStringFragments
```

* **mapper** (<code>[ITokenMapper](#iliapolo-constructs-tokens-itokenmapper)</code>)  *No description*

__Returns__:
* <code>[TokenizedStringFragments](#iliapolo-constructs-tokens-tokenizedstringfragments)</code>



## struct EncodingOptions  <a id="iliapolo-constructs-tokens-encodingoptions"></a>


Properties to string encodings.



Name | Type | Description 
-----|------|-------------
**displayHint**? | <code>string</code> | A hint for the Token's purpose when stringifying it.<br/>__*Default*__: no display hint



## interface IAnyProducer  <a id="iliapolo-constructs-tokens-ianyproducer"></a>


Interface for lazy untyped value producers.
### Methods


#### produce(context) <a id="iliapolo-constructs-tokens-ianyproducer-produce"></a>

Produce the value.

```ts
produce(context: IResolveContext): any
```

* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>



## interface IFragmentConcatenator 🔹 <a id="iliapolo-constructs-tokens-ifragmentconcatenator"></a>

__Implemented by__: [StringConcat](#iliapolo-constructs-tokens-stringconcat)

Function used to concatenate symbols in the target document language.

Interface so it could potentially be exposed over jsii.
### Methods


#### join(left, right)🔹 <a id="iliapolo-constructs-tokens-ifragmentconcatenator-join"></a>

Join the fragment on the left and on the right.

```ts
join(left: any, right: any): any
```

* **left** (<code>any</code>)  *No description*
* **right** (<code>any</code>)  *No description*

__Returns__:
* <code>any</code>



## interface IListProducer  <a id="iliapolo-constructs-tokens-ilistproducer"></a>


Interface for lazy list producers.
### Methods


#### produce(context) <a id="iliapolo-constructs-tokens-ilistproducer-produce"></a>

Produce the list value.

```ts
produce(context: IResolveContext): Array<string>
```

* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>Array<string></code>



## interface INumberProducer  <a id="iliapolo-constructs-tokens-inumberproducer"></a>


Interface for lazy number producers.
### Methods


#### produce(context) <a id="iliapolo-constructs-tokens-inumberproducer-produce"></a>

Produce the number value.

```ts
produce(context: IResolveContext): number
```

* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>number</code>



## interface IPostProcessor  <a id="iliapolo-constructs-tokens-ipostprocessor"></a>


A Token that can post-process the complete resolved value, after resolve() has recursed over it.
### Methods


#### postProcess(input, context) <a id="iliapolo-constructs-tokens-ipostprocessor-postprocess"></a>

Process the completely resolved value, after full recursion/resolution has happened.

```ts
postProcess(input: any, context: IResolveContext): any
```

* **input** (<code>any</code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>



## interface IResolvable  <a id="iliapolo-constructs-tokens-iresolvable"></a>

__Obtainable from__: [Lazy](#iliapolo-constructs-tokens-lazy).[anyValue](#iliapolo-constructs-tokens-lazy#iliapolo-constructs-tokens-lazy-anyvalue)(), [Token](#iliapolo-constructs-tokens-token).[asAny](#iliapolo-constructs-tokens-token#iliapolo-constructs-tokens-token-asany)(), [Tokenization](#iliapolo-constructs-tokens-tokenization).[reverseList](#iliapolo-constructs-tokens-tokenization#iliapolo-constructs-tokens-tokenization-reverselist)(), [Tokenization](#iliapolo-constructs-tokens-tokenization).[reverseNumber](#iliapolo-constructs-tokens-tokenization#iliapolo-constructs-tokens-tokenization-reversenumber)()

Interface for values that can be resolvable later.

Tokens are special objects that participate in synthesis.

### Properties


Name | Type | Description 
-----|------|-------------
**creationStack** | <code>Array<string></code> | The creation stack of this resolvable which will be appended to errors thrown during resolution.

### Methods


#### resolve(context) <a id="iliapolo-constructs-tokens-iresolvable-resolve"></a>

Produce the Token's value at resolution time.

```ts
resolve(context: IResolveContext): any
```

* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>

#### toString() <a id="iliapolo-constructs-tokens-iresolvable-tostring"></a>

Return a string representation of this resolvable object.

Returns a reversible string representation.

```ts
toString(): string
```


__Returns__:
* <code>string</code>



## interface IResolveContext  <a id="iliapolo-constructs-tokens-iresolvecontext"></a>


Current resolution context for tokens.

### Properties


Name | Type | Description 
-----|------|-------------
**preparing** | <code>boolean</code> | True when we are still preparing, false if we're rendering the final output.
**scope** | <code>[IConstruct](#constructs-iconstruct)</code> | The scope from which resolution has been initiated.

### Methods


#### registerPostProcessor(postProcessor) <a id="iliapolo-constructs-tokens-iresolvecontext-registerpostprocessor"></a>

Use this postprocessor after the entire token structure has been resolved.

```ts
registerPostProcessor(postProcessor: IPostProcessor): void
```

* **postProcessor** (<code>[IPostProcessor](#iliapolo-constructs-tokens-ipostprocessor)</code>)  *No description*




#### resolve(x) <a id="iliapolo-constructs-tokens-iresolvecontext-resolve"></a>

Resolve an inner object.

```ts
resolve(x: any): any
```

* **x** (<code>any</code>)  *No description*

__Returns__:
* <code>any</code>



## interface IStringProducer  <a id="iliapolo-constructs-tokens-istringproducer"></a>


Interface for lazy string producers.
### Methods


#### produce(context) <a id="iliapolo-constructs-tokens-istringproducer-produce"></a>

Produce the string value.

```ts
produce(context: IResolveContext): string
```

* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>string</code>



## interface ITokenMapper  <a id="iliapolo-constructs-tokens-itokenmapper"></a>


Interface to apply operation to tokens in a string.

Interface so it can be exported via jsii.
### Methods


#### mapToken(t) <a id="iliapolo-constructs-tokens-itokenmapper-maptoken"></a>

Replace a single token.

```ts
mapToken(t: IResolvable): any
```

* **t** (<code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>)  *No description*

__Returns__:
* <code>any</code>



## interface ITokenResolver  <a id="iliapolo-constructs-tokens-itokenresolver"></a>

__Implemented by__: [DefaultTokenResolver](#iliapolo-constructs-tokens-defaulttokenresolver)

How to resolve tokens.
### Methods


#### resolveList(l, context) <a id="iliapolo-constructs-tokens-itokenresolver-resolvelist"></a>

Resolve a tokenized list.

```ts
resolveList(l: Array<string>, context: IResolveContext): any
```

* **l** (<code>Array<string></code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>

#### resolveString(s, context) <a id="iliapolo-constructs-tokens-itokenresolver-resolvestring"></a>

Resolve a string with at least one stringified token in it.

(May use concatenation)

```ts
resolveString(s: TokenizedStringFragments, context: IResolveContext): any
```

* **s** (<code>[TokenizedStringFragments](#iliapolo-constructs-tokens-tokenizedstringfragments)</code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*

__Returns__:
* <code>any</code>

#### resolveToken(t, context, postProcessor) <a id="iliapolo-constructs-tokens-itokenresolver-resolvetoken"></a>

Resolve a single token.

```ts
resolveToken(t: IResolvable, context: IResolveContext, postProcessor: IPostProcessor): any
```

* **t** (<code>[IResolvable](#iliapolo-constructs-tokens-iresolvable)</code>)  *No description*
* **context** (<code>[IResolveContext](#iliapolo-constructs-tokens-iresolvecontext)</code>)  *No description*
* **postProcessor** (<code>[IPostProcessor](#iliapolo-constructs-tokens-ipostprocessor)</code>)  *No description*

__Returns__:
* <code>any</code>



## struct LazyAnyValueOptions  <a id="iliapolo-constructs-tokens-lazyanyvalueoptions"></a>


Options for creating lazy untyped tokens.



Name | Type | Description 
-----|------|-------------
**displayHint**? | <code>string</code> | Use the given name as a display hint.<br/>__*Default*__: No hint
**omitEmptyArray**? | <code>boolean</code> | If the produced value is an array and it is empty, return 'undefined' instead.<br/>__*Default*__: false



## struct LazyListValueOptions  <a id="iliapolo-constructs-tokens-lazylistvalueoptions"></a>


Options for creating a lazy list token.



Name | Type | Description 
-----|------|-------------
**displayHint**? | <code>string</code> | Use the given name as a display hint.<br/>__*Default*__: No hint
**omitEmpty**? | <code>boolean</code> | If the produced list is empty, return 'undefined' instead.<br/>__*Default*__: false



## struct LazyStringValueOptions  <a id="iliapolo-constructs-tokens-lazystringvalueoptions"></a>


Options for creating a lazy string token.



Name | Type | Description 
-----|------|-------------
**displayHint**? | <code>string</code> | Use the given name as a display hint.<br/>__*Default*__: No hint



## struct ResolveOptions  <a id="iliapolo-constructs-tokens-resolveoptions"></a>


Options to the resolve() operation.

NOT the same as the ResolveContext; ResolveContext is exposed to Token
implementors and resolution hooks, whereas this struct is just to bundle
a number of things that would otherwise be arguments to resolve() in a
readable way.



Name | Type | Description 
-----|------|-------------
**resolver** | <code>[ITokenResolver](#iliapolo-constructs-tokens-itokenresolver)</code> | The resolver to apply to any resolvable tokens found.
**scope** | <code>[IConstruct](#constructs-iconstruct)</code> | The scope from which resolution is performed.
**preparing**? | <code>boolean</code> | Whether the resolution is being executed during the prepare phase or not.<br/>__*Default*__: false



