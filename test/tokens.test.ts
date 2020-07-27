import { Token, Tokenization } from '../src/token';
import { Lazy } from '../src/lazy';
import { createTokenDouble, extractTokenDouble } from '../src/private/encoding';
import { Intrinsic } from '../src/private/intrinsic';
import { findTokens } from '../src/private/resolve';
import { DefaultTokenResolver, IResolvable } from '../src/resolvable';
import { App } from './util';

test('resolve a plain old object should just return the object', () => {
  const obj = { PlainOldObject: 123, Array: [ 1, 2, 3 ] };

  expect(resolve(obj)).toStrictEqual(obj);
})

test('if a value is an object with a token value, it will be evaluated', () => {
  const obj = {
    RegularValue: 'hello',
    LazyValue: new Intrinsic('World'),
  };

  expect(resolve(obj)).toStrictEqual({
    RegularValue: 'hello',
    LazyValue: 'World',
  });

})

test('tokens are evaluated anywhere in the object tree', () => {
  const obj = new Promise1();
  const actual = resolve({ Obj: obj });

  expect(actual).toStrictEqual({
    Obj: [
      {
        Data: {
          stringProp: 'hello',
          numberProp: 1234,
        },
        Recurse: 42,
      },
      {
        Data: {
          stringProp: 'hello',
          numberProp: 1234,
        },
        Recurse: 42,
      },
    ],
  });


})

test('tokens are evaluated recursively', () => {
  const obj = new Promise1();
  const actual = resolve(new Intrinsic({ Obj: obj }));

  expect(actual).toStrictEqual({
    Obj: [
      {
        Data: {
          stringProp: 'hello',
          numberProp: 1234,
        },
        Recurse: 42,
      },
      {
        Data: {
          stringProp: 'hello',
          numberProp: 1234,
        },
        Recurse: 42,
      },
    ],
  });


})

test('empty arrays or objects are kept', () => {
  expect(resolve({ })).toStrictEqual({ });
  expect(resolve([ ])).toStrictEqual([ ]);

  const obj = {
    Prop1: 1234,
    Prop2: { },
    Prop3: [ ],
    Prop4: 'hello',
    Prop5: {
      PropA: { },
      PropB: {
        PropC: [ undefined, undefined ],
        PropD: 'Yoohoo',
      },
    },
  };

  expect(resolve(obj)).toStrictEqual({
    Prop1: 1234,
    Prop2: { },
    Prop3: [ ],
    Prop4: 'hello',
    Prop5: {
      PropA: { },
      PropB: {
        PropC: [ ],
        PropD: 'Yoohoo',
      },
    },
  });


})

test('if an object has a "resolve" property that is not a function, it is not considered a token', () => {
  expect(resolve({ a_token: { resolve: () => 78787 }})).toStrictEqual({ a_token: 78787 });
  expect(resolve({ not_a_token: { resolve: 12 } })).toStrictEqual({ not_a_token: { resolve: 12 } });

})

// tslint:disable-next-line:max-line-length
test('if a resolvable object inherits from a class that is also resolvable, the "constructor" function will not get in the way (uses Object.keys instead of "for in")', () => {
  expect(resolve({ prop: new DataType() })).toStrictEqual({ prop: { foo: 12, goo: 'hello' } });

})

test('isToken(obj) can be used to determine if an object is a token', () => {
  expect(Tokenization.isResolvable({ resolve: () => 123 })).toBeTruthy();
  expect(Tokenization.isResolvable({ a: 1, b: 2, resolve: () => 'hello' })).toBeTruthy();
  expect(!Tokenization.isResolvable({ a: 1, b: 2, resolve: 3 })).toBeTruthy();

})

test('Token can be used to create tokens that contain a constant value', () => {
  expect(resolve(new Intrinsic(12))).toEqual(12);
  expect(resolve(new Intrinsic('hello'))).toEqual('hello');
  expect(resolve(new Intrinsic([ 'hi', 'there' ]))).toEqual([ 'hi', 'there' ]);

})

test('resolving leaves a Date object in working order', () => {
  const date = new Date('2000-01-01');
  const resolved = resolve(date);

  expect(date.toString()).toEqual(resolved.toString());

}),

test('tokens stringification can be reversed', () => {
  // GIVEN
  const token = new Intrinsic('woof woof');

  // THEN
  expect(token).toEqual(Tokenization.reverseString(`${token}`).firstToken);

})

test('tokens can be used in hash keys but must resolve to a string', () => {
  // GIVEN
  const token = new Intrinsic( 'I am a string');

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`,
  };

  // THEN
  expect(resolve(s)).toStrictEqual({ 'I am a string': 'boom I am a string' });

})

test('tokens can be nested in hash keys', () => {
  // GIVEN
  const token = new Intrinsic(Lazy.stringValue({ produce: () => Lazy.stringValue({ produce: (() => 'I am a string') }) }));

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`,
  };

  // THEN
  expect(resolve(s)).toStrictEqual({ 'I am a string': 'boom I am a string' });

})

test('tokens can be nested and concatenated in hash keys', () => {
  // GIVEN
  const innerToken = new Intrinsic( 'toot');
  const token = new Intrinsic( `${innerToken} the woot`);

  // WHEN
  const s = {
    [token.toString()]: 'boom chicago',
  };

  // THEN
  expect(resolve(s)).toStrictEqual({ 'toot the woot': 'boom chicago' });

})

test('can find nested tokens in hash keys', () => {
  // GIVEN
  const innerToken = new Intrinsic( 'toot');
  const token = new Intrinsic( `${innerToken} the woot`);

  // WHEN
  const s = {
    [token.toString()]: 'boom chicago',
  };

  // THEN
  const tokens = findTokens(new App(), () => s);
  expect(tokens.some(t => t === innerToken)).toBeTruthy();
  expect(tokens.some(t => t === token)).toBeTruthy();

})

test('fails if token in a hash key resolves to a non-string', () => {
  // GIVEN
  const token = new Intrinsic({ Ref: 'Other' });

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`,
  };

  // THEN
  try {
    resolve(s)
    fail('The key "${Token[TOKEN.19]}" has been resolved to {"Ref":"Other"} but must be resolvable to a string')
  } catch (error) {}

})

describe('list encoding', () => {
  test('can encode Token to string and resolve the encoding', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const struct = {
      XYZ: Token.asList(token),
    };

    // THEN
    expect(resolve(struct)).toStrictEqual({
      XYZ: { Ref: 'Other'},
    });


  })

  test('cannot add to encoded list', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const encoded: string[] = Token.asList(token);
    encoded.push('hello');

    // THEN
    expect(() => {
      resolve(encoded);
    }).toThrowError(/Cannot add elements to list token/);


  })

  test('cannot add to strings in encoded list', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const encoded: string[] = Token.asList(token);
    encoded[0] += 'hello';

    // THEN
    expect(() => {
      resolve(encoded);
    }).toThrowError(/concatenate strings in/);


  })
})

describe('number encoding', () => {
  test('basic integer encoding works', () => {
    expect(16).toEqual(extractTokenDouble(createTokenDouble(16)));

  })

  test('arbitrary integers can be encoded, stringified, and recovered', () => {
    for (let i = 0; i < 100; i++) {
      // We can encode all numbers up to 2^48-1
      const x = Math.floor(Math.random() * (Math.pow(2, 48) - 1));

      const encoded = createTokenDouble(x);
      // Roundtrip through JSONification
      const roundtripped = JSON.parse(JSON.stringify({ theNumber: encoded })).theNumber;
      const decoded = extractTokenDouble(roundtripped);
      expect(decoded).toEqual(x);
    }


  })

  test('arbitrary numbers are correctly detected as not being tokens', () => {
    expect(extractTokenDouble(0)).toBeUndefined();
    expect(extractTokenDouble(1243)).toBeUndefined();
    expect(extractTokenDouble(4835e+532)).toBeUndefined();


  })

  test('can number-encode and resolve Token objects', () => {
    // GIVEN
    const x = new Intrinsic( 123);

    // THEN
    const encoded = Token.asNumber(x);
    expect(Tokenization.isResolvable(encoded)).toBeFalsy();
    expect(Token.isUnresolved(encoded)).toBeTruthy();

    // THEN
    const resolved = resolve({ value: encoded });
    expect(resolved).toStrictEqual({ value: 123 });


  })
})

test('stack trace is captured at token creation', () => {
  function fn1() {
    function fn2() {
      class ExposeTrace extends Intrinsic {
        public get creationTrace() {
          return this.creationStack;
        }
      }

      return new ExposeTrace('hello');
    }

    return fn2();
  }

  const token = fn1();
  expect(token.creationTrace.find(x => x.includes('fn1'))).toBeTruthy();
  expect(token.creationTrace.find(x => x.includes('fn2'))).toBeTruthy();

})

test('newError returns an error with the creation stack trace', () => {
  function fn1() {
    function fn2() {
      function fn3() {
        class ThrowingToken extends Intrinsic {
          public throwError(message: string) {
            throw this.newError(message);
          }
        }
        return new ThrowingToken('boom');
      }

      return fn3();
    }
    return fn2();
  }
  const token = fn1();
  expect(() => token.throwError('message!')).toThrowError(/Token created:/);

})

describe('type coercion', () => {

  const inputs = [
    'a string',
    1234,
    { an_object: 1234 },
    [ 1, 2, 3 ],
    false,
  ];

  for (const input of inputs) {
    // GIVEN
    const stringToken = Token.asString(new Intrinsic(input));
    const numberToken = Token.asNumber(new Intrinsic(input));
    const listToken = Token.asList(new Intrinsic(input));

    // THEN
    const expected = input;

    test(`${input}<string>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(stringToken)))).toStrictEqual(expected);

    })

    test(`${input}<list>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(listToken)))).toStrictEqual(expected);

    })

    test(`${input}<number>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(numberToken)))).toStrictEqual(expected);

    })

    test(`${input}<string>.toString()`, () => {
      expect(resolve(new Intrinsic(stringToken).toString())).toStrictEqual(expected);

    })

    test(`${input}<list>.toString()`, () => {
      expect(resolve(new Intrinsic(listToken).toString())).toStrictEqual(expected);

    })

    test(`${input}<number>.toString()`, () => {
      expect(resolve(new Intrinsic(numberToken).toString())).toStrictEqual(expected);

    })

    test(`${input}<string>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(stringToken)))).toStrictEqual(expected);

    })

    test(`${input}<list>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(listToken)))).toStrictEqual(expected);

    })

    test(`${input}<number>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(numberToken)))).toStrictEqual(expected);

    })
  }
})

test('creation stack is attached to errors emitted during resolve', () => {
  function showMeInTheStackTrace() {
    return Lazy.stringValue({ produce: () => { throw new Error('fooError'); } });
  }

  const x = showMeInTheStackTrace();
  let message;
  try {
    resolve(x);
  } catch (e) {
    message = e.message;
  }

  expect(message && message.includes('showMeInTheStackTrace')).toBeTruthy();

})

describe('stringifyNumber', () => {
  test('converts number to string', () => {
    expect(Tokenization.stringifyNumber(100)).toEqual('100');

  })

  test('converts tokenized number to string', () => {
    expect(resolve(Tokenization.stringifyNumber({
      resolve: () => 100,
    } as any))).toEqual('100');

  })

  test('string remains the same', () => {
    expect(Tokenization.stringifyNumber('123' as any)).toEqual('123');

  })

  test('Ref remains the same', () => {
    const val = { Ref: 'SomeLogicalId' };
    expect(Tokenization.stringifyNumber(val as any)).toStrictEqual(val);

  })

  test('lazy Ref remains the same', () => {
    const resolvedVal = { Ref: 'SomeLogicalId' };
    const tokenizedVal = Lazy.anyValue({
      produce: () => resolvedVal,
    });
    const res = Tokenization.stringifyNumber(tokenizedVal as any) as any;
    try { // trying to simulate nodeunit.notDeepEqual
      expect(res).toStrictEqual(resolvedVal)
      fail('expected to be not deep equal')
    } catch {}
    expect(resolve(res)).toStrictEqual(resolvedVal);

  })

  test('tokenized Ref remains the same', () => {
    const resolvedVal = { Ref: 'SomeLogicalId' };
    const tokenizedVal = Token.asNumber(resolvedVal);
    const res = Tokenization.stringifyNumber(tokenizedVal) as any;
    try { // trying to simulate nodeunit.notDeepEqual
      expect(res).toStrictEqual(resolvedVal)
      fail('expected to be not deep equal')
    } catch {}
    expect(resolve(res)).toStrictEqual(resolvedVal);

  })
})


class Promise2 implements IResolvable {
  public readonly creationStack = [];

  public resolve() {
    return {
      Data: {
        stringProp: 'hello',
        numberProp: 1234,
      },
      Recurse: new Intrinsic( 42),
    };
  }
}

class Promise1 implements IResolvable {
  public readonly creationStack = [];
  public p2 = [ new Promise2(), new Promise2() ];

  public resolve() {
    return this.p2;
  }
}

class BaseDataType {
  constructor(readonly foo: number) {
  }
}

class DataType extends BaseDataType {
  public goo = 'hello';

  constructor() {
    super(12);
  }
}

/**
 * Wrapper for resolve that creates an throwaway Construct to call it on
 *
 * So I don't have to change all call sites in this file.
 */
function resolve(x: any) {
  const scope = new App();
  return Tokenization.resolve(x, {
    scope,
    resolver: new DefaultTokenResolver({
      join: (left, right) => left + right,
    }),
    preparing: false,
  });
}
