function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GenerateUID(len): string {
	let buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, chars.length - 1)]);
	}

	return buf.join('');
}
export function NewUID(): string {
	return GenerateUID(30);
}
