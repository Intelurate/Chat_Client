/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5=function(e){function t(e,t){return e<<t|e>>>32-t}function n(e,t){var n,r,i,s,o;i=e&2147483648;s=t&2147483648;n=e&1073741824;r=t&1073741824;o=(e&1073741823)+(t&1073741823);if(n&r){return o^2147483648^i^s}if(n|r){if(o&1073741824){return o^3221225472^i^s}else{return o^1073741824^i^s}}else{return o^i^s}}function r(e,t,n){return e&t|~e&n}function i(e,t,n){return e&n|t&~n}function s(e,t,n){return e^t^n}function o(e,t,n){return t^(e|~n)}function u(e,i,s,o,u,a,f){e=n(e,n(n(r(i,s,o),u),f));return n(t(e,a),i)}function a(e,r,s,o,u,a,f){e=n(e,n(n(i(r,s,o),u),f));return n(t(e,a),r)}function f(e,r,i,o,u,a,f){e=n(e,n(n(s(r,i,o),u),f));return n(t(e,a),r)}function l(e,r,i,s,u,a,f){e=n(e,n(n(o(r,i,s),u),f));return n(t(e,a),r)}function c(e){var t;var n=e.length;var r=n+8;var i=(r-r%64)/64;var s=(i+1)*16;var o=Array(s-1);var u=0;var a=0;while(a<n){t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|e.charCodeAt(a)<<u;a++}t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|128<<u;o[s-2]=n<<3;o[s-1]=n>>>29;return o}function h(e){var t="",n="",r,i;for(i=0;i<=3;i++){r=e>>>i*8&255;n="0"+r.toString(16);t=t+n.substr(n.length-2,2)}return t}function p(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t}var d=Array();var v,m,g,y,b,w,E,S,x;var T=7,N=12,C=17,k=22;var L=5,A=9,O=14,M=20;var _=4,D=11,P=16,H=23;var B=6,j=10,F=15,I=21;e=p(e);d=c(e);w=1732584193;E=4023233417;S=2562383102;x=271733878;for(v=0;v<d.length;v+=16){m=w;g=E;y=S;b=x;w=u(w,E,S,x,d[v+0],T,3614090360);x=u(x,w,E,S,d[v+1],N,3905402710);S=u(S,x,w,E,d[v+2],C,606105819);E=u(E,S,x,w,d[v+3],k,3250441966);w=u(w,E,S,x,d[v+4],T,4118548399);x=u(x,w,E,S,d[v+5],N,1200080426);S=u(S,x,w,E,d[v+6],C,2821735955);E=u(E,S,x,w,d[v+7],k,4249261313);w=u(w,E,S,x,d[v+8],T,1770035416);x=u(x,w,E,S,d[v+9],N,2336552879);S=u(S,x,w,E,d[v+10],C,4294925233);E=u(E,S,x,w,d[v+11],k,2304563134);w=u(w,E,S,x,d[v+12],T,1804603682);x=u(x,w,E,S,d[v+13],N,4254626195);S=u(S,x,w,E,d[v+14],C,2792965006);E=u(E,S,x,w,d[v+15],k,1236535329);w=a(w,E,S,x,d[v+1],L,4129170786);x=a(x,w,E,S,d[v+6],A,3225465664);S=a(S,x,w,E,d[v+11],O,643717713);E=a(E,S,x,w,d[v+0],M,3921069994);w=a(w,E,S,x,d[v+5],L,3593408605);x=a(x,w,E,S,d[v+10],A,38016083);S=a(S,x,w,E,d[v+15],O,3634488961);E=a(E,S,x,w,d[v+4],M,3889429448);w=a(w,E,S,x,d[v+9],L,568446438);x=a(x,w,E,S,d[v+14],A,3275163606);S=a(S,x,w,E,d[v+3],O,4107603335);E=a(E,S,x,w,d[v+8],M,1163531501);w=a(w,E,S,x,d[v+13],L,2850285829);x=a(x,w,E,S,d[v+2],A,4243563512);S=a(S,x,w,E,d[v+7],O,1735328473);E=a(E,S,x,w,d[v+12],M,2368359562);w=f(w,E,S,x,d[v+5],_,4294588738);x=f(x,w,E,S,d[v+8],D,2272392833);S=f(S,x,w,E,d[v+11],P,1839030562);E=f(E,S,x,w,d[v+14],H,4259657740);w=f(w,E,S,x,d[v+1],_,2763975236);x=f(x,w,E,S,d[v+4],D,1272893353);S=f(S,x,w,E,d[v+7],P,4139469664);E=f(E,S,x,w,d[v+10],H,3200236656);w=f(w,E,S,x,d[v+13],_,681279174);x=f(x,w,E,S,d[v+0],D,3936430074);S=f(S,x,w,E,d[v+3],P,3572445317);E=f(E,S,x,w,d[v+6],H,76029189);w=f(w,E,S,x,d[v+9],_,3654602809);x=f(x,w,E,S,d[v+12],D,3873151461);S=f(S,x,w,E,d[v+15],P,530742520);E=f(E,S,x,w,d[v+2],H,3299628645);w=l(w,E,S,x,d[v+0],B,4096336452);x=l(x,w,E,S,d[v+7],j,1126891415);S=l(S,x,w,E,d[v+14],F,2878612391);E=l(E,S,x,w,d[v+5],I,4237533241);w=l(w,E,S,x,d[v+12],B,1700485571);x=l(x,w,E,S,d[v+3],j,2399980690);S=l(S,x,w,E,d[v+10],F,4293915773);E=l(E,S,x,w,d[v+1],I,2240044497);w=l(w,E,S,x,d[v+8],B,1873313359);x=l(x,w,E,S,d[v+15],j,4264355552);S=l(S,x,w,E,d[v+6],F,2734768916);E=l(E,S,x,w,d[v+13],I,1309151649);w=l(w,E,S,x,d[v+4],B,4149444226);x=l(x,w,E,S,d[v+11],j,3174756917);S=l(S,x,w,E,d[v+2],F,718787259);E=l(E,S,x,w,d[v+9],I,3951481745);w=n(w,m);E=n(E,g);S=n(S,y);x=n(x,b)}var q=h(w)+h(E)+h(S)+h(x);return q.toLowerCase()}
 
/* 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}
*/