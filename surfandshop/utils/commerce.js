import Commerce from '@chec/commerce.js';

let commerce = null;

// instantiate commerce js
// takes in public key;
const getCommerce = (commercePublicKey) => {
	// if we have already created an instance then return it
	if (commerce) return commerce;
	// else create a new one
	else {
		// get public key from user or .env
		const publicKey = commercePublicKey || process.env.COMMERCE_PUBLIC_KEY;
		//check if user is in development mode
		const environment = process.env.NODE_ENV === 'development';

		// if user is in dev mode and did not enter public key
		if (environment && !publicKey) throw new Error('Public key missing');
		// else create the instance
		else {
			commerce = new Commerce(publicKey, environment);
			return commerce;
		}
	}
};
export default getCommerce;
