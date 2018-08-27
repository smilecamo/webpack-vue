import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p v-text='text'></p>
      <p v-html='html'></p>
      <p v-show='active'>show--{{text}}</p>
      <p v-show='!active'>show--{{text}}</p>
      <p v-if='active'>if--{{text}}</p>
      <p v-if='!active'>if--{{text}}</p>
      <input type='text' v-model='text' />
      <input type='text' v-model.number='text' />
      <input type='text' v-model.trim='text' />
      <input type='checkbox' v-model='active' />
      <div>
        <input type='checkbox' :value='1' v-model='arr' />
        <input type='checkbox' :value='2' v-model='arr' />
        <input type='checkbox' :value='3' v-model='arr' />
      </div>
      <div>
      <input type='radio' value='1' v-model='pick' />
      <input type='radio' value='2' v-model='pick' />
      </div>
      <div>
        <p v-if='active'>if</p>
        <p v-else>else</p>
      </div>
      <ul>
        <li :style='stylus' v-for='(item,index) of arr'>{{item}}--{{index}}</li>
      </ul>
      <ul>
        <li :style='stylus' v-for='(val,key) of obj'>{{key}}--{{val}}</li>
      </ul>
    </div>
  `,
  data: {
    text: 0,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    pick: '',
    active: false,
    html: '<h1>this is h1</h1>',
    stylus: {
      appearance: 'none'
    }
  }
})
