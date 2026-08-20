import { memberDetail, type CoachMember } from '../../../../../data'

/** What the detail tabs render from. Every roster row can be opened — the
 *  identity fields come off the row itself — but only Doran has a filled-in
 *  profile behind her, so `detail` is null for everyone else and the tabs fall
 *  back to their empty states. That matches the reference captures, which were
 *  of a member with almost no history. */
export type MemberView = {
  name: string
  firstName: string
  role: string
  company: string
  modality: string
  program?: string
  avatar: [string, string]
  detail: typeof memberDetail | null
}

export function resolveMember(m: CoachMember): MemberView {
  return {
    name: m.name,
    firstName: m.name.split(' ')[0],
    role: m.role,
    company: m.company,
    modality: m.modality,
    program: m.program,
    avatar: m.avatar,
    detail: m.name === memberDetail.name ? memberDetail : null,
  }
}
