import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongodb';
import Session from '../../../models/Session';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const sessionData = await Session.findOne({
        _id: id,
        userId: session.user.id,
      });

      if (!sessionData) {
        return res.status(404).json({ error: 'Session not found' });
      }

      res.status(200).json({ session: sessionData });
    } catch (error) {
      console.error('Error fetching session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { chatHistory, currentCode, name } = req.body;

      const updateData = {};
      if (chatHistory !== undefined) updateData.chatHistory = chatHistory;
      if (currentCode !== undefined) updateData.currentCode = currentCode;
      if (name !== undefined) updateData.name = name;

      const updatedSession = await Session.findOneAndUpdate(
        {
          _id: id,
          userId: session.user.id,
        },
        updateData,
        { new: true }
      );

      if (!updatedSession) {
        return res.status(404).json({ error: 'Session not found' });
      }

      res.status(200).json({ session: updatedSession });
    } catch (error) {
      console.error('Error updating session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedSession = await Session.findOneAndDelete({
        _id: id,
        userId: session.user.id,
      });

      if (!deletedSession) {
        return res.status(404).json({ error: 'Session not found' });
      }

      res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
      console.error('Error deleting session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 