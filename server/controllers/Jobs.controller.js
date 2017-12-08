import Jobs from '../models/Jobs';
import Company from '../models/Company';
import uuid from 'uuid';
import sanitizeHtml from 'sanitize-html';
import * as err from '../errors/types';
import mongoose from 'mongoose';

// dynamically building our query to support legacy paths
const buildJobQuery = id => {
  const query = {};

  if (mongoose.Types.ObjectId.isValid(id)) {
    query._id = id;
  } else {
    query.pathname = id;
  }

  return query;
};

const parsePercentage = value => {
  if (typeof value === 'string') {
    return parseInt(value.toString().replace(/\D/g, ''), 10) / 100;
  }
};

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export const getJobs = async (req, res) => {
  // currently just filtering GET jobs just by date added...
  const postings = await Jobs.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .select('-description');

  if (!postings) throw Error(err.ERROR_FINDING_JOBS);

  res.status(200).send({ data: { postings }, errors: [] });
};

/**
 * Get a single job
 * @param req
 * @param res
 * @returns void
 */
export const getJob = async (req, res) => {
  const query = buildJobQuery(req.params.jobId);

  const posting = await Jobs.findOne(query).select('-description');

  if (!posting) throw Error(err.ERROR_FINDING_JOBS);

  res.status(200).send({ data: { posting }, errors: [] });
};

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export const createJob = async (req, res) => {
  const { body, params } = req;
  const id = uuid.v4().split('-')[0];
  const pathTitle = body.title
    .split(' ')
    .join('-')
    .toLowerCase();

  const pathname = `${id}-${pathTitle}`;

  const job = await new Jobs({
    description: {
      blocks: body.description.blocks,
    },
    descriptionRaw: body.descriptionRaw,
    receivingEmails: body.receivingEmails,
    company: params.companyId,
    role: body.role,
    title: body.title,
    employmentType: body.employmentType,
    externalLink: body.externalLink,
    location: body.location,
    remote: body.remote,
    pathname,
    salary: {
      max: (body.salary && body.salary.max) || 0,
      min: (body.salary && body.salary.min) || 0,
    },
    equity: {
      max: (body.equity && parsePercentage(body.equity.max)) || 0,
      min: (body.equity && parsePercentage(body.equity.min)) || 0,
      offer: (body.equity && body.equity.offer) || 'No',
    },
  }).save();

  if (!job) throw Error(err.ERROR_CREATING_JOB);

  // Add the company to the current user
  const company = await Company.findOne({ _id: job.company });
  if (!company) throw Error(err.ERROR_FINDING_COMPANY);

  company.jobs.push(job._id);
  company.save();

  res.status(200).send({
    data: { job },
    errors: [],
  });
};

/**
 * Update a single Job
 * @param req
 * @param res
 * @returns void
 */
export const updateJob = async (req, res) => {
  const values = req.body;
  const query = buildJobQuery(req.params.jobId);

  const posting = await Jobs.findOneAndUpdate(
    query,
    { ...values },
    { new: true },
  );

  if (!posting) throw Error(err.ERROR_UPDATING_JOB);

  res.status(200).send({
    data: { posting },
    errors: [],
  });
};

/**
 * Delete a job
 * @param req
 * @param res
 * @returns void
 */
export const deleteJob = async (req, res) => {
  const query = buildJobQuery(req.params.jobId);

  const posting = await Jobs.findOne(query);

  if (!posting) throw Error(err.ERROR_FINDING_JOB);

  posting.remove();

  res.status(200).send({
    data: { posting },
    errors: [],
  });
};
