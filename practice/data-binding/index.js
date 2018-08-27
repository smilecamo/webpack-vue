import Vue from 'vue'

new Vue({
  el: '#root',
  // template: `
  //   <div>
  //     {{isActive ? 'true时显示' : 'false时显示'}}
  //   </div>
  // `,
  // :id 动态绑定  v-html渲染标签
  // template: `
  //   <div :id='aaa'>
  //     {{arr.join('-')}}
  //     <p v-html='html'></p>
  //   </div>
  // `,
  // 动态绑定class => :class='{}' 或 :class="[isActive? 'active': '']" 或 :class="[{active:isActive}]"
  template: `
    <div :class='{ active:!isActive }'>
      {{arr.join('-')}}
      <p
        v-html='html'
        :style='[styles]'
      ></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<h1>this is h1</h1>',
    aaa: 'main',
    styles: {
      color: 'red',
      // 消除默认样式 自动加前缀
      appearance: 'none'
    }
  }
})
