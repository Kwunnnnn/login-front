import decode from "jwt-decode";
import moment from "moment";

export const auth = {
  getTokenExpirationDate(encodedToken) {
    if (!encodedToken) {
      return new Date(0); // is expired
    }

    const token: any = decode(encodedToken);
    if (!token.exp) {
      return new Date(0); // is expired
    }

    const expirationDate = new Date(token.exp * 1000);
    return expirationDate;
  },

  isExpiredToken(encodedToken) {
    const expirationDate = this.getTokenExpirationDate(encodedToken);
    const rightNow = moment();
    const isExpiredToken = moment(rightNow).isAfter(moment(expirationDate));

    return isExpiredToken;
  },
};
export default auth;
