import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle,
  ChevronDown,
  Play,
  Plus,
  Trash,
} from 'react-feather';
import './TaskItems.css';
import useTasks from '../../hooks/useTasks';
import server from '../../app/server';

const getDate = (timestamp, current) => {
  const extract = t => ({
    y: t.substring(0, 4),
    m: t.substring(5, 7),
    d: t.substring(8, 10),
    h: t.substring(11, 13),
    n: t.substring(14, 16),
    s: t.substring(17, 19),
  });

  timestamp = extract(timestamp);
  current = extract(current);

  const diff = +current.d - +timestamp.d;
  const { y, m, d, h, n, s } = timestamp;

  if (diff <= 1) return `${h}:${n}:${s}`;
  else if (diff <= 2 && diff > 1) return 'Yesterday';
  else return `${d}/${m}/${y}`;
};

const Task = ({ data, actions }) => {
  const [loading, setLoading] = useState(false);
  const [descActive, setDescActive] = useState(false);

  const startEnd = async type => {
    setLoading(true);

    try {
      const { cur_time } = await server({
        method: 'put',
        path: `tasks/${data.id}/${type}`,
        passToken: true,
      });

      setLoading(false);
      actions.update(data.id, `${type}_time`, cur_time);
    } catch {
      setLoading(false);
    }
  };

  const del = async () => {
    setLoading(true);

    try {
      await server({
        method: 'delete',
        path: `tasks/${data.id}`,
        passToken: true,
      });

      setLoading(false);
      actions.del(data.id);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="task-itm">
      <div className="itm-row">
        {!data.start_time ? (
          <button
            className="itm-btn itm-bg-g-btn"
            onClick={() => startEnd('start')}
            disabled={loading}>
            <Play />
          </button>
        ) : !data.end_time ? (
          <button
            className="itm-btn itm-bg-g-btn"
            onClick={() => startEnd('end')}
            disabled={loading}>
            <Check />
          </button>
        ) : (
          <span className="itm-btn itm-clr-g-btn itm-done-btn">
            <CheckCircle />
          </span>
        )}

        <h3>{data.title}</h3>

        {data.description && (
          <button
            className="itm-btn itm-desc-btn"
            data-active={descActive}
            onClick={() => setDescActive(!descActive)}>
            <ChevronDown />
          </button>
        )}

        <button
          className="itm-btn itm-bg-r-btn itm-del-btn"
          onClick={del}
          disabled={loading}>
          <Trash />
        </button>
      </div>

      <div className="itm-row itm-time-row">
        <div className="itm-col">{getDate(data.date_added, data.cur_time)}</div>

        <div className="itm-col">
          {!data.start_time ? (
            '-- : --'
          ) : (
            <>
              {getDate(data.start_time, data.cur_time)} -{' '}
              {!data.end_time ? (
                <span className="item-run"></span>
              ) : (
                getDate(data.end_time, data.cur_time)
              )}
            </>
          )}
        </div>
      </div>

      {data.description && (
        <div className="itm-row itm-desc-row" data-active={descActive}>
          {data.description}
        </div>
      )}
    </div>
  );
};

const TaskItems = () => {
  const [{ data }, , actions] = useTasks();

  return (
    <>
      {data.length ? (
        <div className="task-items">
          {data.map(data => (
            <Task key={data.id} data={data} actions={actions} />
          ))}
        </div>
      ) : (
        <div className="no-task-msg">There is nothing to do!</div>
      )}

      <div className="add-task-btn-wrp">
        <Link to="/new">
          <Plus />
        </Link>
      </div>
    </>
  );
};

export default TaskItems;
