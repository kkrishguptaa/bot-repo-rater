import { ApplyOptions } from '@sapphire/decorators'
import { type Events, Listener } from '@sapphire/framework'
import { bgMagenta, bold } from 'colorette'

@ApplyOptions<Listener.Options>({
  once: true
})
export class UserEvent extends Listener<typeof Events.ClientReady> {
  public override run (): void {
    this.container.logger.info(`${bgMagenta(bold('[CLIENT]'))} Logged in as ${this.container.client.user?.tag} (${this.container.client.user?.id})`)
  }
}
