import { deepFreeze } from './object';

describe('Object utils Unit Tests', () => {
  it('souldnot freeze a scalar value', () => {
    const str = deepFreeze('string value');
    expect(typeof str).toBe('string');

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');
    boolean = deepFreeze(false);
    expect(typeof boolean).toBe('boolean');

    const num = deepFreeze(1);
    expect(typeof num).toBe('number');
  });

  it('should freeze object', () => {
    const obj = deepFreeze({
      prop1: 'value1',
      deep: {
        prop2: 'value2',
        prop3: new Date(),
      },
    });

    expect(() => {
      (obj as any).prop1 = 'value2';
    }).toThrow(TypeError);

    expect(() => {
      (obj as any).deep.prop2 = 'value3';
    }).toThrow(TypeError);

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
