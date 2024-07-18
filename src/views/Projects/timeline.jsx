import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';

const TimelineComponent = () => {
  const groups = [
    { id: 1, title: 'Group 1' },
    { id: 2, title: 'Group 2' },
    { id: 3, title: 'Group 3' }
  ];

  const items = [
    {
      id: 1,
      group: 1,
      title: 'Item 1',
      start_time: moment().startOf('week').add(1, 'days').add(9, 'hours'), // Monday at 9 AM
      end_time: moment().startOf('week').add(1, 'days').add(11, 'hours') // Monday at 11 AM
    },
    {
      id: 2,
      group: 2,
      title: 'Item 2',
      start_time: moment().startOf('week').add(2, 'days').add(13, 'hours'), // Tuesday at 1 PM
      end_time: moment().startOf('week').add(2, 'days').add(15, 'hours') // Tuesday at 3 PM
    },
    {
      id: 3,
      group: 1,
      title: 'Item 3',
      start_time: moment().startOf('week').add(3, 'days').add(8, 'hours'), // Wednesday at 8 AM
      end_time: moment().startOf('week').add(3, 'days').add(9, 'hours') // Wednesday at 9 AM
    },
    {
      id: 4,
      group: 3,
      title: 'Item 4',
      start_time: moment().startOf('week').add(4, 'days').add(14, 'hours'), // Thursday at 2 PM
      end_time: moment().startOf('week').add(4, 'days').add(16, 'hours') // Thursday at 4 PM
    },
    {
      id: 5,
      group: 2,
      title: 'Item 5',
      start_time: moment().startOf('week').add(5, 'days').add(10, 'hours'), // Friday at 10 AM
      end_time: moment().startOf('week').add(5, 'days').add(12, 'hours') // Friday at 12 PM
    },
    {
      id: 6,
      group: 1,
      title: 'Item 6',
      start_time: moment().startOf('week').add(6, 'days').add(9, 'hours'), // Saturday at 9 AM
      end_time: moment().startOf('week').add(6, 'days').add(10, 'hours') // Saturday at 10 AM
    },
    {
      id: 7,
      group: 2,
      title: 'Item 7',
      start_time: moment().startOf('week').add(7, 'days').add(11, 'hours'), // Sunday at 11 AM
      end_time: moment().startOf('week').add(7, 'days').add(13, 'hours') // Sunday at 1 PM
    },
    {
      id: 8,
      group: 3,
      title: 'Item 8',
      start_time: moment().startOf('week').add(4, 'days').add(8, 'hours'), // Thursday at 8 AM
      end_time: moment().startOf('week').add(4, 'days').add(10, 'hours') // Thursday at 10 AM
    },
    {
      id: 9,
      group: 1,
      title: 'Item 9',
      start_time: moment().startOf('week').add(3, 'days').add(14, 'hours'), // Wednesday at 2 PM
      end_time: moment().startOf('week').add(3, 'days').add(16, 'hours') // Wednesday at 4 PM
    }
  ];

  return (
    <div className="h-96 bg-white rounded-xl flex overflow-auto">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().startOf('week')}
        defaultTimeEnd={moment().endOf('week')}
      />
    </div>
  );
}

export default TimelineComponent;
