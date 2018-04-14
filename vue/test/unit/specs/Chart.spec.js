import Chart from '@/components/Chart';
import { mount } from '@vue/test-utils';

describe('Chart.vue', () => {
  it('should render correct contents', () => {
    const stats = { start: '2016-01-03', end: '2016-02-03', package: 'axios', downloads: [{ downloads: 3000, day: '2016-02-01' }, { downloads: 5000, day: '2016-02-02' }, { downloads: 9000, day: '2016-02-03' }] };
    const wrapper = mount(Chart, {
      propsData: {
        stats,
      },
    });

    expect(wrapper.vm.stats).toBe(stats);

    /*
     There will be x and y axis, if the count is 32, then I need 32 in x axis,
     the Y value is coming from the downloads count of a given day,
     let say download counts are 3, 5, 9
     then the highest will be of 9 and the lowest is 3

    */
    expect(wrapper.vm.points)
      .toEqual('0,26 66,17 132,0');

    expect(wrapper.vm.path)
      .toEqual('M 0,40 0,26 66,17 132,0 132,40');
  });
});
