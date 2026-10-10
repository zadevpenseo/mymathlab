import { describe, it, expect } from 'vitest';
import { serializeStateToHash, deserializeHashToState } from '../src/domain/url-state';

describe('URL State Serializer & Deserializer', () => {
  it('serializes parameter state into a valid URL hash string', () => {
    const hash = serializeStateToHash({
      params: { a: 2, b: -4, c: 1 },
      step: 'observe',
      isProjectorMode: true,
      isFreeExplore: false
    });

    expect(hash).toContain('a=2');
    expect(hash).toContain('b=-4');
    expect(hash).toContain('c=1');
    expect(hash).toContain('step=observe');
    expect(hash).toContain('projector=1');
    expect(hash.startsWith('#')).toBe(true);
  });

  it('deserializes URL hash back into state object accurately', () => {
    const defaultParams = { a: 1, b: 0, c: 0 };
    const hash = '#a=2.5&b=-5&c=3&step=explain&projector=1&explore=1';
    const state = deserializeHashToState(hash, defaultParams);

    expect(state.params.a).toBe(2.5);
    expect(state.params.b).toBe(-5);
    expect(state.params.c).toBe(3);
    expect(state.step).toBe('explain');
    expect(state.isProjectorMode).toBe(true);
    expect(state.isFreeExplore).toBe(true);
  });

  it('falls back to default parameters if hash is empty', () => {
    const defaultParams = { a: 1, b: -4, c: 3 };
    const state = deserializeHashToState('', defaultParams);

    expect(state.params).toEqual(defaultParams);
    expect(state.isProjectorMode).toBe(false);
    expect(state.isFreeExplore).toBe(false);
  });
});
