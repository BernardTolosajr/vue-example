import { mount } from '@vue/test-utils';
import AddTodo from '@/components/AddTodo';
import { expect } from 'chai';

describe('AddTodo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddTodo);
  });

  it('create new todo when input is not empty', () => {
    const newTodo = wrapper.find('#new-todo');

    newTodo.element.value = 'new todo';
    newTodo.trigger('input');

    newTodo.trigger('keyup.enter');

    const {
      id,
      content,
      completed,
      editing
     } = wrapper.emitted('create-todo')[0][0];

    expect(id).to.not.be.undefined;
    expect(content).to.equal('new todo');
    expect(completed).to.be.false;
    expect(editing).to.be.false;
  });

  it('does not create new todo when input is empty', () => {
    const newTodo = wrapper.find('#new-todo');

    newTodo.trigger('keyup.enter');

    expect(wrapper.emitted('create-todo')).to.be.undefined;
  });
});
