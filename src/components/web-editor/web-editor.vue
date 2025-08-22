<template>
  test
  <FilesDrawer
    ref="filesDrawer"
  />
  <WebMenubar
    @open-files="$refs.filesDrawer.show()"
  />

</template>

<script>
import FilesDrawer from './files-drawer.vue';
import WebMenubar from './web-menubar.vue';


export default{
  components: {
    WebMenubar, FilesDrawer
  },
  props: {
    project: Object,
    exerciseData: Object
  },
  data(){
    return {
      files: []
    };
  }
}
</script>