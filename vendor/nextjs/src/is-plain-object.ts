export function getObjectClassLabel(value: any): string {
  return Object.prototype.toString.call(value)
}

export function isPlainObject(value: any): boolean {
  if (getObjectClassLabel(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}


// Normalize and retrieve options
export const getOpts = function (opts = {}) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { onCreate, bugsUrl } = opts
  validateOnCreate(onCreate)
  const bugsUrlA = serializeBugsUrl(bugsUrl)
  return { onCreate, bugsUrl: bugsUrlA }
}

const validateOnCreate = function (onCreate) {
  if (onCreate !== undefined && typeof onCreate !== 'function') {
    throw new TypeError(`"onCreate" option must be a function: ${onCreate}`)
  }
}

const serializeBugsUrl = function (bugsUrl) {
  return bugsUrl === undefined ? undefined : String(normalizeBugsUrl(bugsUrl))
}

const normalizeBugsUrl = function (bugsUrl) {
  if (bugsUrl instanceof URL) {
    return bugsUrl
  }

  if (typeof bugsUrl !== 'string') {
    throw new TypeError(
      `"bugsUrl" option must be a string or a URL: ${bugsUrl}`,
    )
  }

  try {
    return new URL(bugsUrl)
  } catch (error) {
    throw new Error(
      `"bugsUrl" option "${bugsUrl}" must be ${getUrlError(error, bugsUrl)}`,
    )
  }
}

const getUrlError = function (error, bugsUrl) {
  try {
    // eslint-disable-next-line no-new
    new URL(bugsUrl, EXAMPLE_ORIGIN)
    return 'an absolute URL.'
  } catch {
    return `a valid URL: ${error.message}.`
  }
}

const EXAMPLE_ORIGIN = 'https://example.com'
