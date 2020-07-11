/**
 * 中介者模式的简单实现
 *
 * 暴露了publish和subscribe方法来使用
 */

var mediator = (function () {
  // 存储可被广播或监听的topic
  var topics = {};

  // 订阅一个topic，提供一个回调函数，一旦topic被广播就执行回调
  var subscribe = function (topic, fn) {
    if (!topic[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({ context: this, callback: fn });

    return this;
  };

  // 发布/广播事件到程序的剩余部分
  var publish = function (topic) {
    var args;

    if (!topic[topic]) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  };

  return {
    Publish: publish,
    Subscribe: subscribe,
    installTo: function (obj) {
      obj.publish = publish;
      obj.subscribe = subscribe;
    },
  };
})();
