/**
 * Bi-directional URL Hash State Serializer & Deserializer
 * Allows instant state sharing without database accounts or auth friction.
 */

export interface AppStatePayload {
  params: Record<string, number>;
  step?: string;
  isProjectorMode?: boolean;
  isFreeExplore?: boolean;
}

/**
 * Serializes current state to a URL hash fragment string.
 * Example: #a=1&b=-4&c=3&mode=free
 */
export function serializeStateToHash(state: AppStatePayload): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(state.params)) {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  if (state.step) {
    parts.push(`step=${encodeURIComponent(state.step)}`);
  }

  if (state.isProjectorMode) {
    parts.push('projector=1');
  }

  if (state.isFreeExplore) {
    parts.push('explore=1');
  }

  return `#${parts.join('&')}`;
}

/**
 * Deserializes URL hash fragment into state payload.
 */
export function deserializeHashToState(
  hash: string,
  defaultParams: Record<string, number>
): AppStatePayload {
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!cleanHash) {
    return {
      params: { ...defaultParams },
      isProjectorMode: false,
      isFreeExplore: false
    };
  }

  const resultParams: Record<string, number> = { ...defaultParams };
  let step: string | undefined;
  let isProjectorMode = false;
  let isFreeExplore = false;

  const pairs = cleanHash.split('&');
  for (const pair of pairs) {
    const [rawKey, rawVal] = pair.split('=');
    if (!rawKey) continue;
    const key = decodeURIComponent(rawKey);
    const val = rawVal !== undefined ? decodeURIComponent(rawVal) : '';

    if (key === 'step') {
      step = val;
    } else if (key === 'projector') {
      isProjectorMode = val === '1' || val === 'true';
    } else if (key === 'explore') {
      isFreeExplore = val === '1' || val === 'true';
    } else {
      const parsedNum = parseFloat(val);
      if (!isNaN(parsedNum)) {
        resultParams[key] = parsedNum;
      }
    }
  }

  return {
    params: resultParams,
    step,
    isProjectorMode,
    isFreeExplore
  };
}

/**
 * Copies shareable link with current hash to clipboard.
 */
export async function copyShareableLink(state: AppStatePayload): Promise<string> {
  const hash = serializeStateToHash(state);
  const fullUrl = `${window.location.origin}${window.location.pathname}${hash}`;
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(fullUrl);
  }
  return fullUrl;
}
