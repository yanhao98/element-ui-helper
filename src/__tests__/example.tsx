import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { defineComponent,version } from "vue";

// The component to test
const MessageComponent = defineComponent({
    props: ['msg'],
    setup(props) {
        return () => {
            return <p>{props.msg}</p>
        }
    }
})

test('displays message', () => {
    console.debug(`vue version :>> `, version);
    const wrapper = mount(defineComponent({
        setup() {
            return () => {
                return <MessageComponent msg="Hello world - prop" />
            }
        },
    }))

    console.debug(`wrapper.text() :>> `, wrapper.text());
    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world')
})
