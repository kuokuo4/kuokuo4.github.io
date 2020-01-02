/**
 * Created by xiaohong on 2019/2/20.
 */
Vue.http.options.emulateJSON = true;
Vue.http.options.timeout = 10000;

new Vue({
  el: '#app',
  data: {
    question: {},
    ask: [],
    showAnswer: false,
  },
  mounted() {
    var askData = JSON.parse(utils.urlDecode(ask));
    askData.map(function (o) {
      o.close = true;
      return o;
    });
    this.ask = askData;
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.scrollTop = scrollTop;
    },
    toggleClose: function (index) {
      var item = this.ask[index];
      if (item.content.length <= 2) return false;
      this.ask.map(function (o, i) {
        if (i == index) o.close = !o.close;
        return o;
      });
    },
    viewAnswer: function (index1, index2) {
      this.showAnswer = true;
      var ask = this.ask[index1];
      this.question = ask.content[index2];
      // 滚动穿透
      document.body.classList.add('modal-open');
      document.body.style.top = '-' + this.scrollTop + 'px';
    },
    closeAnswer: function () {
      this.showAnswer = false;
      // 滚动穿透
      document.body.classList.remove('modal-open');
      var top = document.body.style.top;
      window.scrollTo(0,-parseInt(top));
      document.body.style.top = '';
    }
  },
});