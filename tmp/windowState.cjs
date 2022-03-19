/** @NOTE TODO */
this.state = {
  route,
  pathname,
  query,
  asPath: autoExportDynamic ? pathname : as,
  isPreview: !!isPreview,
  locale: process.env.__NEXT_I18N_SUPPORT ? locale : undefined,
  isFallback,
}

if (typeof window !== 'undefined') {
  // make sure "as" doesn't start with double slashes or else it can
  // throw an error as it's considered invalid
  if (as.substr(0, 2) !== '//') {
    // in order for `e.state` to work on the `onpopstate` event
    // we have to register the initial route upon initialization
    const options: TransitionOptions = { locale }
    ;(options as any)._shouldResolveHref = as !== pathname

    this.changeState(
      'replaceState',
      formatWithValidation({ pathname: addBasePath(pathname), query }),
      getURL(),
      options
    )
  }

window.addEventListener('popstate', this.onPopState)
