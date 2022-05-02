import Entry from 'models/Entry';

export async function get(req, res) {
  try {
    const entries = await Entry.find({});
    return res.status(200).json({
      code: 200,
      message: entries,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}

export async function getSingle(req, res) {
  try {
    const entry = await Entry.findOne({ _id: req.params.id });
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}

export async function post(req, res) {
  try {
    const { title, description, endAt, notifyAt } = req.body;

    const entry = new Entry({
      title,
      description,
      endAt: new Date(endAt),
      notifyAt: new Date(notifyAt),
      isCompleted: false,
    });
    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}

export async function patch(req, res) {
  try {
    const entry = await Entry.findOne({ _id: req.params.id });

    const { title, description, endAt, notifyAt, isCompleted } = req.body;

    if (title) {
      entry.title = title;
    }

    if (description) {
      entry.description = description;
    }

    if (endAt) {
      entry.endAt = new Date(endAt);
    }

    if (notifyAt) {
      entry.notifyAt = new Date(notifyAt);
    }

    if (isCompleted) {
      entry.isCompleted = !!isCompleted;
    }

    await entry.save();
    return res.status(200).json({
      code: 200,
      message: entry,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await Entry.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      code: 200,
      message: {
        _id: id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      error: 'Internal Server Error!',
    });
  }
}
