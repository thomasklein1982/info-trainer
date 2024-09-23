<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"  :viewBox="viewBox">
    <defs>
      <marker 
        id='arrow' 
        orient="auto" 
        viewBox="0 0 2 4"
        refX='2' 
        refY='2'
        
      >
        <path d='M0,0 l2,2 l-2,2' stroke-width="context-stroke-width" stroke="context-stroke" fill="context-fill"  />
      </marker>
    </defs>
    <slot></slot>
  </svg>
</template>

<script>

export default{
  props: {
    viewBox: String,
  },
  computed: {
    
  }
};
</script>