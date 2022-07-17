import { mount, shallowMount } from '@vue/test-utils'
import MacroCategorias from '@/components/categorias/MacroCategorias.vue'

describe('Categorias Components -> MacroCategorias', () => {
    test('should be render', () => {
        const wrapper = mount(MacroCategorias)
        expect(wrapper.vm).toMatchSnapshot()
    });
})