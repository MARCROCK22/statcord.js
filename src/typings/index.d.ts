declare module "statcord.js" {
    import { EventEmitter } from "events";

    // Create options
    interface BaseClientOptions {
        key: string;
        postCpuStatistics?: boolean;
        postMemStatistics?: boolean;
        postNetworkStatistics?: boolean;
        debug?: {
            enabled: boolean;
            outfile?: string;
        }
    }


    interface ClientOptions<T> extends BaseClientOptions {
        client: T;
        methods: {
            getGuildCount: (client: T) => Promise<number> | number;
            getUserCount: (client: T) => Promise<number> | number;
            getClientId: (client: T) => Promise<string> | string;
        }
    }

    // Create client typings
    class BaseClient<T> extends EventEmitter {
        private autoposting: boolean;

        private baseApiUrl: string;
        private key: string;
        private client: T;

        private v11: boolean;
        private v12: boolean;
        private activeUsers: string[];
        private commandsRun: number;
        private used_bytes: number;
        private popularCommands: [
            {
                name: string;
                count: number;
            }
        ];

        private postCpuStatistics: boolean;
        private postMemStatistics: boolean;
        private postNetworkStatistics: boolean;

        public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
        public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
        public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;

        private debug(info: string, type: string): void;
    }

    export class Client<T> extends BaseClient<T> {
        constructor(options: ClientOptions<T>);

        private customFields: Map<1 | 2, (manager: T) => Promise<string>>;
        public methods: {
            getGuildCount: (client: T) => Promise<string | number> | number | string;
            getUserCount: (client: T) => Promise<string | number> | number | string;
            getClientId: (client: T) => Promise<string | number> | number | string;
        }
        public autopost(): Promise<boolean | Error>;
        public post(): Promise<boolean | Error>;
        public postCommand(command_name: string, author: string): Promise<void>;
        public registerCustomFieldHandler(customFieldNumber: 1 | 2, handler: (client: T) => Promise<string>): Promise<null>;
    }

    interface ClientEvents {
        "post": [boolean | Error | string],
        "autopost-start": []
    }
}
