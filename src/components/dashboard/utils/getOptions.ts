const getOptions = (options: string) => (!options ? {} : JSON.parse(options));

export default getOptions