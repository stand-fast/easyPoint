export function judgeToken(code) {
    switch (code) {
        case -30:
            alert('登陆过期，请重新登陆');
            break;
        case -20:
            alert('认证错误，请重新登陆');
            break;
        case -10:
            alert('未登录，请重新登陆');
            break;
        case 10:
            alert('登陆过期，请重新登陆');
            break;
        default:
            break;
    }
    this.$store.dispatch("loginOut");
    this.$router.push("/login");
}