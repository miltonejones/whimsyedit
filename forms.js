const settingsForm = [
  {
    field: 'api_key',
    desc: 'Enter your OpenAI API Key',
    type: 'password',
    test: (value) => !!value?.length,
    warning: 'API Key is required'
  },
  {
    field: 'temperature',
    desc: 'Set AI accuracy between 0 and 1',
    test: value => !isNaN(value) && value >= 0 && value <= 1,
    warning: 'Temperature must be between 0 and 1'
  },
  {
    field: 'max_tokens',
    desc: 'Tokens used can be up to 2048',
    test: value => !isNaN(value) && value >= 0 && value <= 2048,
    warning: 'Cannot use more than 2048 tokens or less than 0'
  },
];

const apiForm = [
  {
    field: 'api_key',
    label: 'API Key'
  }
]

const labelOf = str => str.replace(/_/g, ' ');

const Form = {
  Input: (item, object, fn) => {
   const { field, type, desc, test } = item;
   const value = object[field]

    const label = labelOf(field)
    return $("<div>")
      .append(
        $(`<label id="${field}">`)
          .css({
            textTransform: 'capitalize'
          })
          .text(label),
        $("<div>")
          .css({
            fontSize: '0.8rem'
          })
          .text(desc),
        $(`<input id="${field}">`)
          .css(styles.formControl)
          .attr('type', type || 'text')
          .val(value)
          .on('change', (event) => {
            fn(field, event.target.value)
          })
      )
  },
  check: (config, object) => { 
    config.map(item => {
      const ok = item.test(object[item.field]);
    
      if (!ok) { 
        // do something here
      }
    })
  }, 
  create: (config, object) => { 
    const form = $("<div>")
      .css({
        display: 'flex',
        gap: '16px',
        flexDirection: 'column'
      })
    
    config.map(item => { 
      form.append(Form.Input(item, object, (key, val) => { 
        const ok = item.test(val);
        if (!ok) {
          return alert(item.warning)
        }
        Object.assign(object, { [key]: val }); 
        console.log({ object }) 
      }))
    })
    return form;
  }
}