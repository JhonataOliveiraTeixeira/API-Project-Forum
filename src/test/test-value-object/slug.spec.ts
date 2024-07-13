import { expect, test } from 'vitest'
import { Slug } from '../../domain/entities/value-objects/slug'

test('it shloud be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question from title')

  expect(slug.value).toEqual('example-question-from-title')
})
